(function () {
  const S = window.PORTFOLIO_SAMPLES;

  const state = {
    flylow: { hub: "GRU", cap: 900, trip: "oneway", adults: 1, children: 0, selectedId: "gru-eze-fo" },
    radar: { streetIdx: 0, speed: 64, distance: 180, mirrored: false },
    lebet: { matchIdx: 0, sharpOdd: 2.24, sharpOppOdd: 1.72, softOdd: 2.35, bankroll: 2000 },
    aircatch: { offerIdx: 0, phase: "monitoring", cooldown: 0, timerId: null },
    jira: { queue: "all", selectedKey: "ACME-418", notes: { "ACME-418": "Follow up after 4.19 build verification" } },
    blockly: { preset: "buggy" },
    chatjira: { scope: "customer", dateField: "resolved", range: "30d" },
    csat: { lang: "en", ticketId: "SUP-1042", votedTickets: {}, up: 142, down: 9 },
    botkb: { ticketIdx: 0 },
    alertbot: { presetIdx: 0 },
    testplan: {
      statuses: ["Pass", "Pass", "Fail", "Blocked", "Not Started"]
    },
    greeter: {
      presetIdx: 0,
      output: ""
    },
    hittheclock: { clockIn: "08:30", lunchOut: "12:00", lunchIn: "13:00", weekend: false }
  };

  function esc(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showToast(title, body) {
    const tray = document.getElementById("toastTray");
    if (!tray) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<div class="toast-title">${esc(title)}</div><div class="toast-body">${esc(body)}</div>`;
    tray.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 3200);
  }

  function fmtBRL(n) {
    return "R$ " + Number(n).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calcFlyLowTotal(route, st) {
    const factor = st.trip === "roundtrip" ? route.rtFactor : 1;
    const adultFare = route.basePrice * factor;
    const childFare = adultFare * (1 - route.childDiscount);
    const taxes = (route.taxAdult * st.adults + route.taxChild * st.children) * (st.trip === "roundtrip" ? 1.75 : 1);
    const total = adultFare * st.adults + childFare * st.children + taxes;
    return { adultUnit: adultFare + route.taxAdult * (st.trip === "roundtrip" ? 1.75 : 1), total };
  }

  function renderFlyLow(mount, lang, compact) {
    const st = state.flylow;
    const pt = lang === "pt";
    const filtered = S.flylowRoutes.filter((r) => {
      if (st.hub === "GRU") return r.origin === "GRU" && r.intl && r.basePrice <= st.cap;
      return r.origin === "CNF";
    });
    if (filtered.length && !filtered.some((r) => r.id === st.selectedId)) {
      st.selectedId = filtered[0].id;
    }
    const selected = filtered.find((r) => r.id === st.selectedId) || filtered[0];

    mount.innerHTML = `
      <div class="demo-controls-row">
        <div class="field">
          <span class="field-label">${pt ? "Origem / Radar" : "Origin / Radar"}</span>
          <div class="seg-group">
            <button type="button" class="seg-btn ${st.hub === "GRU" ? "active" : ""}" data-fl-hub="GRU">${pt ? "Radar SP Exterior" : "SP Intl Radar"}</button>
            <button type="button" class="seg-btn ${st.hub === "CNF" ? "active" : ""}" data-fl-hub="CNF">${pt ? "Hub BH (CNF)" : "BH Hub (CNF)"}</button>
          </div>
        </div>
        ${st.hub === "GRU" ? `
          <div class="field" style="min-width:170px;flex:1">
            <span class="field-label">${pt ? "Teto ida SP:" : "SP one-way cap:"} <span class="tabular">R$ ${st.cap}</span></span>
            <input type="range" class="range" min="450" max="1300" step="50" value="${st.cap}" data-fl-cap>
          </div>
        ` : ""}
        <div class="field">
          <span class="field-label">${pt ? "Viagem" : "Trip"}</span>
          <div class="seg-group">
            <button type="button" class="seg-btn ${st.trip === "oneway" ? "active" : ""}" data-fl-trip="oneway">${pt ? "Só ida" : "One-way"}</button>
            <button type="button" class="seg-btn ${st.trip === "roundtrip" ? "active" : ""}" data-fl-trip="roundtrip">${pt ? "Ida e volta" : "Round-trip"}</button>
          </div>
        </div>
        ${compact ? "" : `
          <div class="field">
            <span class="field-label">${pt ? "Adultos" : "Adults"}</span>
            <select class="select" data-fl-adults>
              ${[1, 2, 3, 4].map((n) => `<option value="${n}" ${st.adults === n ? "selected" : ""}>${n}</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <span class="field-label">${pt ? "Crianças" : "Children"}</span>
            <select class="select" data-fl-children>
              ${[0, 1, 2].map((n) => `<option value="${n}" ${st.children === n ? "selected" : ""}>${n}</option>`).join("")}
            </select>
          </div>
        `}
      </div>
      <div class="${compact ? "stack-sm" : "demo-grid-2"}">
        <div class="data-list">
          ${filtered.length === 0 ? `<div class="demo-box muted-note">${pt ? "Nenhuma rota abaixo deste teto." : "No routes under this cap."}</div>` :
            filtered.slice(0, compact ? 3 : 5).map((r) => {
              const price = calcFlyLowTotal(r, st);
              return `
                <button type="button" class="data-row ${selected && selected.id === r.id ? "selected" : ""}" data-fl-pick="${r.id}">
                  <div style="text-align:left">
                    <div style="font-weight:500;font-size:14px">${esc(r.origin)} → ${esc(r.dest)} <span class="muted-note">· ${esc(r.destCity)}</span></div>
                    <div class="mono-meta">${esc(r.airline)} ${esc(r.code)} · ${r.dep}–${r.arr}</div>
                  </div>
                  <div style="text-align:right">
                    <div class="mono-tag" style="color:var(--accent)">${fmtBRL(price.total)}</div>
                  </div>
                </button>
              `;
            }).join("")}
        </div>
        ${selected && !compact ? (() => {
          const p = calcFlyLowTotal(selected, st);
          const gfUrl = `https://www.google.com/travel/flights?q=Flights%20to%20${selected.dest}%20from%20${selected.origin}`;
          return `
            <div class="demo-box stack-md">
              <div class="row-between">
                <div>
                  <div style="font-size:16px;font-weight:500">${esc(selected.origin)} → ${esc(selected.dest)} (${esc(selected.destCity)})</div>
                  <div class="mono-meta">${esc(selected.airline)} · ${esc(selected.aircraft)} · ${selected.durationMin} min</div>
                </div>
                <span class="status-pill positive"><span class="status-dot"></span>${pt ? "Voo direto" : "Direct"}</span>
              </div>
              <div class="kpi-row" style="margin-bottom:0">
                <div class="kpi-card">
                  <div class="kpi-label">${pt ? "Unitário adulto" : "Adult unit"}</div>
                  <div class="kpi-val" style="font-size:18px">${fmtBRL(p.adultUnit)}</div>
                </div>
                <div class="kpi-card">
                  <div class="kpi-label">${pt ? "Total grupo" : "Group total"}</div>
                  <div class="kpi-val accent" style="font-size:18px">${fmtBRL(p.total)}</div>
                </div>
              </div>
              <div class="row-between">
                <span class="muted-note">${pt ? "Inclui bolsa pessoal + mala 10kg e taxas estimadas" : "Includes personal item + 10kg carry-on and estimated taxes"}</span>
                <a href="${gfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">Google Flights</a>
              </div>
            </div>
          `;
        })() : ""}
      </div>
    `;

    mount.querySelectorAll("[data-fl-hub]").forEach((btn) => {
      btn.addEventListener("click", () => {
        st.hub = btn.dataset.flHub;
        if (window.rerenderFlyLowAll) window.rerenderFlyLowAll();
      });
    });
    mount.querySelectorAll("[data-fl-trip]").forEach((btn) => {
      btn.addEventListener("click", () => {
        st.trip = btn.dataset.flTrip;
        if (window.rerenderFlyLowAll) window.rerenderFlyLowAll();
      });
    });
    const capEl = mount.querySelector("[data-fl-cap]");
    if (capEl) {
      capEl.addEventListener("input", (e) => {
        st.cap = Number(e.target.value);
        if (window.rerenderFlyLowAll) window.rerenderFlyLowAll();
      });
    }
    const adEl = mount.querySelector("[data-fl-adults]");
    if (adEl) {
      adEl.addEventListener("change", (e) => {
        st.adults = Number(e.target.value);
        if (window.rerenderFlyLowAll) window.rerenderFlyLowAll();
      });
    }
    const chEl = mount.querySelector("[data-fl-children]");
    if (chEl) {
      chEl.addEventListener("change", (e) => {
        st.children = Number(e.target.value);
        if (window.rerenderFlyLowAll) window.rerenderFlyLowAll();
      });
    }
    mount.querySelectorAll("[data-fl-pick]").forEach((btn) => {
      btn.addEventListener("click", () => {
        st.selectedId = btn.dataset.flPick;
        if (window.rerenderFlyLowAll) window.rerenderFlyLowAll();
      });
    });
  }

  function renderRadarMonitor(mount, lang) {
    const st = state.radar;
    const pt = lang === "pt";
    const cam = S.radarsBH[st.streetIdx];
    const overspeed = st.speed > cam.limit;
    const alertActive = st.distance <= 350;
    const ttsLine = overspeed
      ? `Atenção. Radar de ${cam.limit} quilômetros por hora a ${st.distance} metros na ${cam.street}. Reduza a velocidade.`
      : `Radar de ${cam.limit} quilômetros por hora a ${st.distance} metros na ${cam.street}.`;

    mount.innerHTML = `
      <div class="demo-grid-2">
        <div class="demo-box stack-md">
          <div class="field">
            <span class="field-label">${pt ? "Ponto geocodificado (BH)" : "Geocoded BH camera"}</span>
            <select class="select" id="rmStreet">
              ${S.radarsBH.map((r, i) => `<option value="${i}" ${i === st.streetIdx ? "selected" : ""}>${esc(r.street)} (${r.limit} km/h)</option>`).join("")}
            </select>
          </div>
          <div class="field">
            <span class="field-label">${pt ? "Velocidade simulada:" : "Simulated speed:"} <span class="tabular">${st.speed} km/h</span></span>
            <input type="range" class="range" id="rmSpeed" min="20" max="100" step="2" value="${st.speed}">
          </div>
          <div class="field">
            <span class="field-label">${pt ? "Distância Haversine:" : "Haversine distance:"} <span class="tabular">${st.distance} m</span></span>
            <input type="range" class="range" id="rmDist" min="40" max="600" step="10" value="${st.distance}">
          </div>
          <div class="row-between">
            <button type="button" class="btn btn-secondary btn-sm" id="rmMirrorBtn">${st.mirrored ? (pt ? "Desativar espelho HUD" : "Disable mirror HUD") : (pt ? "Espelhar para para-brisa" : "Mirror windshield HUD")}</button>
            <span class="mono-meta">${cam.lat.toFixed(4)}, ${cam.lon.toFixed(4)}</span>
          </div>
          <div class="code-block">${pt ? "Script TTS PT-BR:" : "PT-BR TTS output:"}\n"${esc(ttsLine)}"</div>
        </div>
        <div class="hud-stage ${st.mirrored ? "mirrored" : ""}">
          <div class="row-between" style="width:100%">
            <span class="status-pill ${overspeed ? "negative" : alertActive ? "warning" : "positive"}">
              <span class="status-dot"></span>
              ${overspeed ? (pt ? "ACIMA DO LIMITE" : "OVERSPEED") : alertActive ? (pt ? "APROXIMAÇÃO" : "APPROACHING") : (pt ? "MONITORANDO" : "MONITORING")}
            </span>
            <div class="speed-sign">${cam.limit}</div>
          </div>
          <div style="text-align:center">
            <div class="hud-speed-readout ${overspeed ? "overspeed" : ""}">${st.speed}</div>
            <div class="mono-meta">km/h</div>
          </div>
          <div class="row-between" style="width:100%">
            <span class="muted-note">${esc(cam.street)}</span>
            <span class="mono-tag tabular">${st.distance} m</span>
          </div>
        </div>
      </div>
    `;

    mount.querySelector("#rmStreet").addEventListener("change", (e) => {
      st.streetIdx = Number(e.target.value);
      renderRadarMonitor(mount, lang);
    });
    mount.querySelector("#rmSpeed").addEventListener("input", (e) => {
      st.speed = Number(e.target.value);
      renderRadarMonitor(mount, lang);
    });
    mount.querySelector("#rmDist").addEventListener("input", (e) => {
      st.distance = Number(e.target.value);
      renderRadarMonitor(mount, lang);
    });
    mount.querySelector("#rmMirrorBtn").addEventListener("click", () => {
      st.mirrored = !st.mirrored;
      renderRadarMonitor(mount, lang);
    });
  }

  function renderLeBet(mount, lang) {
    const st = state.lebet;
    const pt = lang === "pt";
    const m = S.lebetMatches[st.matchIdx];

    // Exact proportional devig from calculator.py
    const rawP1 = 1 / st.sharpOdd;
    const rawP2 = 1 / st.sharpOppOdd;
    const overround = rawP1 + rawP2;
    const fairProb = rawP1 / overround;
    const fairOdd = 1 / fairProb;
    const marginPct = (overround - 1) * 100;
    const evPct = (fairProb * st.softOdd - 1) * 100;
    const b = st.softOdd - 1;
    const fullKelly = b > 0 ? (b * fairProb - (1 - fairProb)) / b : 0;
    const quarterKellyPct = Math.max(0, fullKelly * 0.25 * 100);
    const stakeBRL = (st.bankroll * quarterKellyPct) / 100;

    mount.innerHTML = `
      <div class="demo-controls-row">
        <div class="field" style="flex:1;min-width:220px">
          <span class="field-label">${pt ? "Partida de exemplo" : "Sample fixture"}</span>
          <select class="select" id="lbMatch">
            ${S.lebetMatches.map((item, i) => `<option value="${i}" ${i === st.matchIdx ? "selected" : ""}>${esc(item.league)} · ${esc(item.match)}</option>`).join("")}
          </select>
        </div>
        <div class="field" style="width:110px">
          <span class="field-label">${pt ? "Odd Sharp" : "Sharp odd"}</span>
          <input type="number" step="0.01" min="1.05" class="input tabular" id="lbSharp" value="${st.sharpOdd}">
        </div>
        <div class="field" style="width:110px">
          <span class="field-label">${pt ? "Odd Soft" : "Soft odd"}</span>
          <input type="number" step="0.01" min="1.05" class="input tabular" id="lbSoft" value="${st.softOdd}">
        </div>
        <div class="field" style="width:120px">
          <span class="field-label">${pt ? "Banca (R$)" : "Bankroll (R$)"}</span>
          <input type="number" step="100" min="100" class="input tabular" id="lbBank" value="${st.bankroll}">
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-label">${pt ? "Odd justa (Devig)" : "Fair devig odd"}</div>
          <div class="kpi-val">${fairOdd.toFixed(2)}</div>
          <div class="kpi-sub">${(fairProb * 100).toFixed(1)}% · vig ${marginPct.toFixed(2)}%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">${pt ? "Valor esperado (+EV)" : "Expected value (+EV)"}</div>
          <div class="kpi-val ${evPct > 0 ? "positive" : "negative"}">${evPct >= 0 ? "+" : ""}${evPct.toFixed(2)}%</div>
          <div class="kpi-sub">${esc(m.softBook)} vs ${esc(m.sharpBook)}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">${pt ? "Gestão 1/4 Kelly" : "1/4 Kelly stake"}</div>
          <div class="kpi-val accent">${quarterKellyPct.toFixed(2)}%</div>
          <div class="kpi-sub">${fmtBRL(stakeBRL)}</div>
        </div>
      </div>

      <div class="demo-box">
        <div class="row-between" style="margin-bottom:8px">
          <span style="font-size:13px;font-weight:500">${esc(m.pick)} · ${esc(m.softBook)} @ ${st.softOdd.toFixed(2)}</span>
          <span class="status-pill ${evPct >= 3 ? "positive" : "warning"}"><span class="status-dot"></span>Gemini 3.8 Flash</span>
        </div>
        <div class="muted-note" style="color:var(--text-secondary)">${esc(pt ? m.verdictPt : m.verdictEn)}</div>
      </div>
    `;

    mount.querySelector("#lbMatch").addEventListener("change", (e) => {
      st.matchIdx = Number(e.target.value);
      const picked = S.lebetMatches[st.matchIdx];
      st.sharpOdd = picked.sharpAwayOdd;
      st.sharpOppOdd = picked.sharpHomeOdd;
      st.softOdd = picked.softOdd;
      renderLeBet(mount, lang);
    });
    mount.querySelector("#lbSharp").addEventListener("input", (e) => {
      st.sharpOdd = Math.max(1.02, Number(e.target.value) || 1.02);
      renderLeBet(mount, lang);
    });
    mount.querySelector("#lbSoft").addEventListener("input", (e) => {
      st.softOdd = Math.max(1.02, Number(e.target.value) || 1.02);
      renderLeBet(mount, lang);
    });
    mount.querySelector("#lbBank").addEventListener("input", (e) => {
      st.bankroll = Math.max(0, Number(e.target.value) || 0);
      renderLeBet(mount, lang);
    });
  }

  function renderAirCatch(mount, lang) {
    const st = state.aircatch;
    const pt = lang === "pt";
    const offer = S.aircatchOffers[st.offerIdx];
    const matched = S.aircatchKeywords.filter((kw) => offer.destination.toLowerCase().includes(kw.toLowerCase()));

    mount.innerHTML = `
      <div class="demo-grid-2">
        <div class="stack-md">
          <div class="field">
            <span class="field-label">${pt ? "Cenário de corrida" : "Incoming ride scenario"}</span>
            <select class="select" id="acOffer">
              ${S.aircatchOffers.map((o, i) => `<option value="${i}" ${i === st.offerIdx ? "selected" : ""}>${esc(pt ? o.labelPt : o.labelEn)}</option>`).join("")}
            </select>
          </div>
          <div class="demo-box stack-sm">
            <div class="field-label">${pt ? "Keywords monitoradas (Node + ML Kit OCR)" : "Monitored keywords (Node + ML Kit OCR)"}</div>
            <div class="stage-tags">
              ${S.aircatchKeywords.map((kw) => {
                const hit = matched.includes(kw);
                return `<span class="mono-tag" style="${hit && st.phase !== "monitoring" ? "color:var(--positive);border-color:rgba(76,195,138,0.4)" : ""}">${esc(kw)}</span>`;
              }).join("")}
            </div>
          </div>
          <div class="row-between">
            <button type="button" class="btn btn-accent" id="acTrigger">${pt ? "Simular detecção" : "Simulate detection"}</button>
            <button type="button" class="btn btn-secondary btn-sm" id="acReset">${pt ? "Resetar" : "Reset"}</button>
          </div>
          <div class="mono-meta">
            ${st.phase === "monitoring" ? (pt ? "Estado: Monitorando nós da tela" : "State: Monitoring accessibility nodes") :
              st.phase === "detected" ? (pt ? "Estado: Keyword detectada — preparando dispatchGesture" : "State: Keyword matched — preparing dispatchGesture") :
              st.phase === "accepted" ? (pt ? `Estado: Aceite disparado · Cooldown ${st.cooldown}s` : `State: Gesture dispatched · Cooldown ${st.cooldown}s`) :
              (pt ? "Estado: Sem keyword de aeroporto — ignorado" : "State: No airport keyword — skipped")}
          </div>
        </div>

        <div class="phone-frame">
          <div class="phone-topbar">
            <span>com.ubercab.driver</span>
            <span>Accessibility ON</span>
          </div>
          <div class="overlay-bubble ${st.phase}" title="OverlayService">${st.phase === "accepted" ? "OK" : st.phase === "detected" ? "!" : st.phase === "paused" ? "--" : "M"}</div>
          <div class="ride-card">
            <div class="row-between">
              <span style="font-size:20px;font-weight:500" class="tabular">${esc(offer.fare)}</span>
              <span class="mono-tag">${esc(offer.distance)}</span>
            </div>
            <div class="stack-sm">
              <div class="muted-note">${pt ? "Embarque:" : "Pickup:"} <span style="color:var(--text-primary)">${esc(offer.pickup)}</span></div>
              <div class="muted-note">${pt ? "Destino:" : "Destination:"} <span style="color:var(--text-primary)">${esc(offer.destination)}</span></div>
            </div>
            <button type="button" class="btn ${st.phase === "accepted" ? "btn-accent" : "btn-primary"}" style="width:100%;height:38px" disabled>
              ${st.phase === "accepted" ? (pt ? "Aceito automaticamente" : "Auto-accepted") : esc(offer.button)}
            </button>
          </div>
        </div>
      </div>
    `;

    mount.querySelector("#acOffer").addEventListener("change", (e) => {
      if (st.timerId) clearInterval(st.timerId);
      st.offerIdx = Number(e.target.value);
      st.phase = "monitoring";
      st.cooldown = 0;
      renderAirCatch(mount, lang);
    });

    mount.querySelector("#acReset").addEventListener("click", () => {
      if (st.timerId) clearInterval(st.timerId);
      st.phase = "monitoring";
      st.cooldown = 0;
      renderAirCatch(mount, lang);
    });

    mount.querySelector("#acTrigger").addEventListener("click", () => {
      if (st.timerId) clearInterval(st.timerId);
      if (matched.length === 0) {
        st.phase = "paused";
        renderAirCatch(mount, lang);
        return;
      }
      st.phase = "detected";
      renderAirCatch(mount, lang);
      setTimeout(() => {
        st.phase = "accepted";
        st.cooldown = 6;
        renderAirCatch(mount, lang);
        st.timerId = setInterval(() => {
          st.cooldown -= 1;
          if (st.cooldown <= 0) {
            clearInterval(st.timerId);
            st.timerId = null;
            st.phase = "monitoring";
          }
          if (mount.isConnected) renderAirCatch(mount, lang);
        }, 1000);
      }, 450);
    });
  }

  function renderJiraMonitor(mount, lang) {
    const st = state.jira;
    const pt = lang === "pt";
    const tickets = S.jiraTickets.filter((t) => st.queue === "all" || t.queue === st.queue);
    if (tickets.length && !tickets.some((t) => t.key === st.selectedKey)) st.selectedKey = tickets[0].key;
    const sel = tickets.find((t) => t.key === st.selectedKey) || tickets[0];

    mount.innerHTML = `
      <div class="demo-controls-row" style="justify-content:space-between">
        <div class="seg-group">
          <button type="button" class="seg-btn ${st.queue === "all" ? "active" : ""}" data-jm-q="all">${pt ? "Todos (4)" : "All (4)"}</button>
          <button type="button" class="seg-btn ${st.queue === "customer" ? "active" : ""}" data-jm-q="customer">${pt ? "Cliente" : "Customer"}</button>
          <button type="button" class="seg-btn ${st.queue === "engineering" ? "active" : ""}" data-jm-q="engineering">${pt ? "Engenharia (SMI/SUP)" : "Engineering"}</button>
        </div>
        <span class="mono-meta">SSE /api/stream · 60s poll</span>
      </div>
      <div class="demo-grid-2">
        <div class="data-list">
          ${tickets.map((t) => `
            <button type="button" class="data-row ${sel && sel.key === t.key ? "selected" : ""}" data-jm-key="${t.key}">
              <div style="text-align:left;min-width:0">
                <div class="row-between" style="justify-content:flex-start;gap:8px">
                  <span class="mono-index" style="color:var(--accent)">${esc(t.key)}</span>
                  <span style="font-size:13px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(t.summary)}</span>
                </div>
                <div class="mono-meta">${esc(t.reporter)} · ${esc(t.updatedAgo)}</div>
              </div>
              <span class="status-pill ${t.statusTone}">${esc(t.status)}</span>
            </button>
          `).join("")}
        </div>
        ${sel ? `
          <div class="demo-box stack-md">
            <div class="row-between">
              <span class="mono-index" style="color:var(--accent)">${esc(sel.key)} · ${esc(sel.priority)}</span>
              <span class="status-pill ${sel.statusTone}">${esc(sel.status)}</span>
            </div>
            <div style="font-size:14px;font-weight:500">${esc(sel.summary)}</div>
            <div class="code-block">${pt ? "Resumo Gemini:" : "Gemini executive summary:"}\n${esc(pt ? sel.aiSummaryPt : sel.aiSummaryEn)}</div>
            <div class="stack-sm">
              <span class="field-label">${pt ? "Linha do tempo" : "Chronological timeline"}</span>
              ${sel.timeline.map((ev) => `<div class="muted-note"><span class="mono-meta">${esc(ev.date)}</span> — ${esc(ev.text)}</div>`).join("")}
            </div>
            <div class="field">
              <span class="field-label">${pt ? "Nota local privada (notes.json)" : "Local private note (notes.json)"}</span>
              <input type="text" class="input" id="jmNote" value="${esc(st.notes[sel.key] || "")}" placeholder="${pt ? "Adicionar lembrete" : "Add reminder"}">
            </div>
          </div>
        ` : ""}
      </div>
    `;

    mount.querySelectorAll("[data-jm-q]").forEach((b) => {
      b.addEventListener("click", () => {
        st.queue = b.dataset.jmQ;
        renderJiraMonitor(mount, lang);
      });
    });
    mount.querySelectorAll("[data-jm-key]").forEach((b) => {
      b.addEventListener("click", () => {
        st.selectedKey = b.dataset.jmKey;
        renderJiraMonitor(mount, lang);
      });
    });
    const noteEl = mount.querySelector("#jmNote");
    if (noteEl && sel) {
      noteEl.addEventListener("input", (e) => {
        st.notes[sel.key] = e.target.value;
      });
    }
  }

  function renderBlocklyMaster(mount, lang) {
    const st = state.blockly;
    const pt = lang === "pt";
    const sample = S.blocklyPayloads[st.preset];

    mount.innerHTML = `
      <div class="demo-controls-row">
        <div class="seg-group">
          ${Object.keys(S.blocklyPayloads).map((k) => `
            <button type="button" class="seg-btn ${st.preset === k ? "active" : ""}" data-bm-p="${k}">
              ${esc(pt ? S.blocklyPayloads[k].labelPt : S.blocklyPayloads[k].labelEn)}
            </button>
          `).join("")}
        </div>
      </div>
      <div class="demo-grid-2">
        <div class="field">
          <span class="field-label">${pt ? "Payload XML / AST decodificado" : "Decoded XML / AST payload"}</span>
          <pre class="code-block" style="margin:0;max-height:220px">${esc(sample.xml)}</pre>
        </div>
        <div class="stack-md">
          <div class="field">
            <span class="field-label">${pt ? "Outline legível (UUIDs resolvidos)" : "Readable outline (UUIDs resolved)"}</span>
            <pre class="code-block" style="margin:0">${esc(sample.outline.join("\n"))}</pre>
          </div>
          <div class="stack-sm">
            <span class="field-label">${pt ? "Diagnóstico do linter" : "Linter diagnostics"}</span>
            ${sample.issues.length === 0
              ? `<div class="status-pill positive"><span class="status-dot"></span>${pt ? "Nenhum erro estrutural encontrado" : "Zero structural violations found"}</div>`
              : sample.issues.map((iss) => `<div class="status-pill ${iss.severity}" style="white-space:normal;padding:6px 10px">${esc(pt ? iss.msgPt : iss.msgEn)}</div>`).join("")}
          </div>
        </div>
      </div>
    `;

    mount.querySelectorAll("[data-bm-p]").forEach((b) => {
      b.addEventListener("click", () => {
        st.preset = b.dataset.bmP;
        renderBlocklyMaster(mount, lang);
      });
    });
  }

  function renderChatJira(mount, lang) {
    const st = state.chatjira;
    const pt = lang === "pt";
    const jql = `project in (${st.scope === "customer" ? "ACME, BETA, GAMMA" : "SUP, ENG, SR"}) AND ${st.dateField} >= -${st.range} ORDER BY ${st.dateField} DESC`;
    const mult = st.range === "7d" ? 0.35 : st.range === "30d" ? 1 : 2.6;
    const baseData = st.scope === "customer"
      ? [
          { name: "Analyst A", count: Math.round(42 * mult) },
          { name: "Analyst B", count: Math.round(35 * mult) },
          { name: "Analyst C", count: Math.round(29 * mult) },
          { name: "Analyst D", count: Math.round(18 * mult) }
        ]
      : [
          { name: "Core Squad", count: Math.round(31 * mult) },
          { name: "Mobile Sync", count: Math.round(24 * mult) },
          { name: "Reports", count: Math.round(16 * mult) },
          { name: "Auth / SSO", count: Math.round(11 * mult) }
        ];
    const max = Math.max(...baseData.map((d) => d.count));

    mount.innerHTML = `
      <div class="demo-controls-row">
        <div class="field">
          <span class="field-label">${pt ? "Escopo" : "Queue"}</span>
          <div class="seg-group">
            <button type="button" class="seg-btn ${st.scope === "customer" ? "active" : ""}" data-cj-scope="customer">${pt ? "Clientes" : "Customer"}</button>
            <button type="button" class="seg-btn ${st.scope === "internal" ? "active" : ""}" data-cj-scope="internal">${pt ? "Interno" : "Internal"}</button>
          </div>
        </div>
        <div class="field">
          <span class="field-label">${pt ? "Campo de data" : "Date field"}</span>
          <div class="seg-group">
            <button type="button" class="seg-btn ${st.dateField === "resolved" ? "active" : ""}" data-cj-date="resolved">${pt ? "Resolvido" : "Resolved"}</button>
            <button type="button" class="seg-btn ${st.dateField === "created" ? "active" : ""}" data-cj-date="created">${pt ? "Aberto" : "Opened"}</button>
          </div>
        </div>
        <div class="field">
          <span class="field-label">${pt ? "Janela" : "Window"}</span>
          <div class="seg-group">
            ${["7d", "30d", "90d"].map((w) => `<button type="button" class="seg-btn ${st.range === w ? "active" : ""}" data-cj-range="${w}">${w}</button>`).join("")}
          </div>
        </div>
      </div>
      <div class="code-block" style="margin-bottom:16px">${esc(jql)}</div>
      <div class="demo-box chart-bars">
        ${baseData.map((row, idx) => `
          <div class="chart-bar-row">
            <span class="chart-bar-label">${esc(row.name)}</span>
            <div class="chart-bar-track">
              <div class="chart-bar-fill ${idx === 0 ? "lead" : ""}" style="width:${Math.round((row.count / max) * 100)}%"></div>
            </div>
            <span class="chart-bar-val">${row.count}</span>
          </div>
        `).join("")}
      </div>
    `;

    mount.querySelectorAll("[data-cj-scope]").forEach((b) => b.addEventListener("click", () => { st.scope = b.dataset.cjScope; renderChatJira(mount, lang); }));
    mount.querySelectorAll("[data-cj-date]").forEach((b) => b.addEventListener("click", () => { st.dateField = b.dataset.cjDate; renderChatJira(mount, lang); }));
    mount.querySelectorAll("[data-cj-range]").forEach((b) => b.addEventListener("click", () => { st.range = b.dataset.cjRange; renderChatJira(mount, lang); }));
  }

  function renderCsat(mount, lang) {
    const st = state.csat;
    const pt = lang === "pt";
    const total = st.up + st.down;
    const pct = total ? ((st.up / total) * 100).toFixed(1) : "0.0";
    const promptCopy = {
      en: `How was support on ticket ${st.ticketId}?`,
      pt: `Como foi o atendimento no chamado ${st.ticketId}?`,
      es: `Como fue la atencion del ticket ${st.ticketId}?`
    }[st.lang];
    const alreadyVoted = st.votedTickets[st.ticketId];

    mount.innerHTML = `
      <div class="demo-controls-row">
        <div class="field">
          <span class="field-label">${pt ? "Idioma do e-mail" : "Survey language"}</span>
          <div class="seg-group">
            ${["en", "pt", "es"].map((l) => `<button type="button" class="seg-btn ${st.lang === l ? "active" : ""}" data-cs-lang="${l}">${l.toUpperCase()}</button>`).join("")}
          </div>
        </div>
        <div class="field">
          <span class="field-label">Ticket ID</span>
          <input type="text" class="input" id="csTicket" value="${esc(st.ticketId)}" style="width:140px">
        </div>
      </div>

      <div class="demo-grid-2">
        <div class="demo-box stack-md">
          <div style="font-size:15px;font-weight:500">${esc(promptCopy)}</div>
          <div class="row-between" style="justify-content:flex-start;gap:12px">
            <button type="button" class="btn btn-accent" id="csUp" ${alreadyVoted ? "disabled" : ""}>${pt ? "Satisfeito (+1)" : "Satisfied (+1)"}</button>
            <button type="button" class="btn btn-secondary btn-sm" id="csDown" ${alreadyVoted ? "disabled" : ""}>${pt ? "Insatisfeito" : "Unsatisfied"}</button>
          </div>
          <div class="mono-meta">
            ${alreadyVoted
              ? (pt ? `Voto duplicado bloqueado para ${st.ticketId} (${alreadyVoted})` : `Duplicate vote blocked for ${st.ticketId} (${alreadyVoted})`)
              : (pt ? "Trava anti-prefetch e anti-duplicidade ativa" : "Prefetch guard & duplicate check active")}
          </div>
        </div>

        <div class="kpi-row" style="margin-bottom:0">
          <div class="kpi-card">
            <div class="kpi-label">${pt ? "Satisfação" : "CSAT Score"}</div>
            <div class="kpi-val positive">${pct}%</div>
            <div class="kpi-sub">${total} ${pt ? "votos" : "votes"}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">${pt ? "Positivos" : "Positive"}</div>
            <div class="kpi-val">${st.up}</div>
            <div class="kpi-sub">Postgres row</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">${pt ? "Negativos" : "Negative"}</div>
            <div class="kpi-val">${st.down}</div>
            <div class="kpi-sub">PDF / CSV ready</div>
          </div>
        </div>
      </div>
    `;

    mount.querySelectorAll("[data-cs-lang]").forEach((b) => b.addEventListener("click", () => { st.lang = b.dataset.csLang; renderCsat(mount, lang); }));
    mount.querySelector("#csTicket").addEventListener("input", (e) => {
      st.ticketId = e.target.value.trim() || "SUP-1042";
    });
    mount.querySelector("#csTicket").addEventListener("change", () => renderCsat(mount, lang));
    mount.querySelector("#csUp").addEventListener("click", () => {
      if (st.votedTickets[st.ticketId]) return;
      st.votedTickets[st.ticketId] = "up";
      st.up += 1;
      showToast("CSAT", `Recorded positive feedback for ${st.ticketId}`);
      renderCsat(mount, lang);
    });
    mount.querySelector("#csDown").addEventListener("click", () => {
      if (st.votedTickets[st.ticketId]) return;
      st.votedTickets[st.ticketId] = "down";
      st.down += 1;
      showToast("CSAT", `Recorded negative feedback for ${st.ticketId}`);
      renderCsat(mount, lang);
    });
  }

  function renderBotKb(mount, lang) {
    const st = state.botkb;
    const pt = lang === "pt";
    const cases = [
      {
        label: "EN · Sync HTTP 413 payload error",
        langDetected: "en (0.99)",
        cql: 'space = "KB" AND text ~ "HTTP 413 attachment upload"',
        matches: [
          { key: "SUP-391", sim: "0.91", title: "Increase multipart chunking limit on sync worker" },
          { key: "SUP-284", sim: "0.84", title: "Reverse proxy client_max_body_size override" }
        ],
        comment: "Internal triage note: Detected language EN. Top resolved match SUP-391 (cosine 0.91) + KB article 'Configuring Upload Chunk Thresholds'."
      },
      {
        label: "PT · Erro de permissão no SSO corporativo",
        langDetected: "pt (0.98)",
        cql: 'space = "KB" AND text ~ "SAML assertion role mapping"',
        matches: [
          { key: "SUP-405", sim: "0.89", title: "Mapeamento de grupo Azure AD sem perfil padrão" },
          { key: "SUP-312", sim: "0.81", title: "Expiração de certificado IdP no login móvel" }
        ],
        comment: "Nota interna de triagem: Idioma PT detectado. Ticket similar SUP-405 (cosseno 0.89) + artigo KB 'Configuração de Claims SAML'."
      }
    ];
    const c = cases[st.ticketIdx];

    mount.innerHTML = `
      <div class="demo-controls-row">
        <div class="seg-group">
          ${cases.map((item, i) => `<button type="button" class="seg-btn ${i === st.ticketIdx ? "active" : ""}" data-kb-i="${i}">${esc(item.label)}</button>`).join("")}
        </div>
      </div>
      <div class="demo-grid-2">
        <div class="stack-sm">
          <div class="demo-box row-between">
            <span class="field-label">langdetect</span>
            <span class="mono-tag">${esc(c.langDetected)}</span>
          </div>
          <div class="demo-box stack-sm">
            <span class="field-label">${pt ? "Tickets resolvidos por cosseno" : "Cosine-similar resolved tickets"}</span>
            ${c.matches.map((m) => `
              <div class="row-between">
                <span style="font-size:13px"><span class="mono-index" style="color:var(--accent)">${esc(m.key)}</span> · ${esc(m.title)}</span>
                <span class="mono-tag">${m.sim}</span>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="stack-sm">
          <div class="code-block">CQL: ${esc(c.cql)}</div>
          <div class="code-block">${esc(c.comment)}</div>
        </div>
      </div>
    `;

    mount.querySelectorAll("[data-kb-i]").forEach((b) => b.addEventListener("click", () => {
      st.ticketIdx = Number(b.dataset.kbI);
      renderBotKb(mount, lang);
    }));
  }

  function renderAlertBot(mount, lang) {
    const st = state.alertbot;
    const pt = lang === "pt";
    const payloads = [
      {
        title: "SSA-812 · High DB latency",
        uuid: "8f3c1e20-9a41-4c72-b102-1199aa00bb01",
        tenant: "Tenant Northwind Logistics",
        runbook: "https://runbooks.example.internal/db-pool-saturation",
        dashboard: "https://telemetry.example.internal/d/postgres-lat"
      },
      {
        title: "SSA-819 · Sync queue backlog",
        uuid: "4b7d9912-1120-4f88-9012-7722cc44dd09",
        tenant: "Tenant Meridian Energy",
        runbook: "https://runbooks.example.internal/worker-drain",
        dashboard: "https://telemetry.example.internal/d/queue-lag"
      }
    ];
    const p = payloads[st.presetIdx];

    mount.innerHTML = `
      <div class="demo-controls-row" style="justify-content:space-between">
        <div class="seg-group">
          ${payloads.map((item, i) => `<button type="button" class="seg-btn ${i === st.presetIdx ? "active" : ""}" data-ab-i="${i}">${esc(item.title)}</button>`).join("")}
        </div>
        <button type="button" class="btn btn-accent" id="abToastBtn">${pt ? "Disparar alerta desktop" : "Trigger desktop toast"}</button>
      </div>
      <div class="demo-grid-2">
        <div class="code-block">Raw payload:\n{\n  "alert": "${esc(p.title)}",\n  "tenant_uuid": "${esc(p.uuid)}",\n  "runbook": "${esc(p.runbook)}",\n  "dashboard": "${esc(p.dashboard)}"\n}</div>
        <div class="code-block">${pt ? "Comentário interno gerado:" : "Generated internal comment:"}\nCustomer: ${esc(p.tenant)}\nRunbook: ${esc(p.runbook)}\nDashboard: ${esc(p.dashboard)}\nRelated open alerts: SSA-804, SSA-798, SSA-791</div>
      </div>
    `;

    mount.querySelectorAll("[data-ab-i]").forEach((b) => b.addEventListener("click", () => {
      st.presetIdx = Number(b.dataset.abI);
      renderAlertBot(mount, lang);
    }));
    mount.querySelector("#abToastBtn").addEventListener("click", () => {
      showToast(`AlertBot · ${p.title}`, `${p.tenant} — Runbook & 3 sibling alerts linked`);
    });
  }

  function renderTestPlan(mount, lang) {
    const st = state.testplan;
    const pt = lang === "pt";
    const rows = [
      { id: "UAT-01", en: "Filter work orders by scheduled date window", pt: "Filtrar ordens por janela de agendamento" },
      { id: "UAT-02", en: "Recalculate capacity bar after drag-and-drop", pt: "Recalcular barra de capacidade após arrastar" },
      { id: "UAT-03", en: "Validate mandatory signature on offline close", pt: "Validar assinatura obrigatória no fechamento offline" },
      { id: "UAT-04", en: "Export bilingual PDF summary with header totals", pt: "Exportar resumo PDF bilíngue com totais" },
      { id: "UAT-05", en: "Verify dynamic rule trigger on priority escalation", pt: "Verificar regra dinâmica na escalação de prioridade" }
    ];
    const total = st.statuses.length;
    const passed = st.statuses.filter((s) => s === "Pass").length;
    const failed = st.statuses.filter((s) => s === "Fail").length;
    const blocked = st.statuses.filter((s) => s === "Blocked").length;
    const executed = passed + failed + blocked;
    const passRate = executed ? Math.round((passed / executed) * 100) : 0;
    const progress = Math.round((executed / total) * 100);

    mount.innerHTML = `
      <div class="kpi-row">
        <div class="kpi-card"><div class="kpi-label">Total</div><div class="kpi-val">${total}</div></div>
        <div class="kpi-card"><div class="kpi-label">${pt ? "Executados" : "Executed"}</div><div class="kpi-val">${executed}</div></div>
        <div class="kpi-card"><div class="kpi-label">${pt ? "Aprovados" : "Passed"}</div><div class="kpi-val positive">${passed}</div></div>
        <div class="kpi-card"><div class="kpi-label">${pt ? "Falhas" : "Failed"}</div><div class="kpi-val negative">${failed}</div></div>
        <div class="kpi-card"><div class="kpi-label">${pt ? "Taxa aprovação" : "Pass rate"}</div><div class="kpi-val accent">${passRate}%</div><div class="kpi-sub">${progress}% ${pt ? "progresso" : "done"}</div></div>
      </div>
      <div class="data-list">
        ${rows.map((r, i) => `
          <div class="data-row">
            <div style="min-width:0">
              <span class="mono-index" style="color:var(--accent)">${r.id}</span>
              <span style="font-size:13px;margin-left:8px">${esc(pt ? r.pt : r.en)}</span>
            </div>
            <select class="select" data-tp-idx="${i}" style="height:32px">
              ${["Pass", "Fail", "Blocked", "Not Started"].map((opt) => `<option value="${opt}" ${st.statuses[i] === opt ? "selected" : ""}>${opt}</option>`).join("")}
            </select>
          </div>
        `).join("")}
      </div>
    `;

    mount.querySelectorAll("[data-tp-idx]").forEach((sel) => {
      sel.addEventListener("change", (e) => {
        st.statuses[Number(sel.dataset.tpIdx)] = e.target.value;
        renderTestPlan(mount, lang);
      });
    });
  }

  function renderGreeter(mount, lang) {
    const st = state.greeter;
    const pt = lang === "pt";
    const presets = [
      {
        label: "PT · Resumo de ticket",
        raw: "cliente relatou erro ao sincronizar anexo no celular depois da atualizacao",
        greeting: "Olá! Obrigado por entrar em contato conosco.\n\nRecebemos seu relato sobre a falha ao sincronizar anexos após a atualização recente no aplicativo móvel e já iniciamos a análise do caso.\n\nAssim que validarmos os logs de envio, retorno com os próximos passos.",
        polish: "O cliente relatou uma falha na sincronização de anexos no dispositivo móvel logo após a atualização do aplicativo."
      },
      {
        label: "EN · Ticket summary",
        raw: "user cant export pdf report from web console getting timeout after 30s",
        greeting: "Hello, thank you for reaching out to support.\n\nI have reviewed your report regarding the 30-second timeout when exporting PDF reports from the web console and I am checking the server logs now.\n\nI will follow up with an update shortly.",
        polish: "The user is unable to export PDF reports from the web console due to a 30-second request timeout."
      }
    ];
    const p = presets[st.presetIdx];
    if (!st.output) st.output = p.greeting;

    mount.innerHTML = `
      <div class="demo-controls-row" style="justify-content:space-between">
        <div class="seg-group">
          ${presets.map((item, i) => `<button type="button" class="seg-btn ${i === st.presetIdx ? "active" : ""}" data-gr-i="${i}">${esc(item.label)}</button>`).join("")}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button type="button" class="btn btn-accent" id="grGreetBtn"><span class="keycap">Ctrl+Alt+A</span> ${pt ? "Gerar saudação" : "Generate greeting"}</button>
          <button type="button" class="btn btn-secondary btn-sm" id="grPolishBtn"><span class="keycap">Ctrl+Alt+S</span> ${pt ? "Revisar texto" : "Polish text"}</button>
        </div>
      </div>
      <div class="demo-grid-2">
        <div class="field">
          <span class="field-label">${pt ? "Área de transferência (Entrada)" : "Clipboard input"}</span>
          <textarea class="textarea" id="grInput">${esc(p.raw)}</textarea>
        </div>
        <div class="field">
          <span class="field-label">${pt ? "Saída gravada no clipboard" : "Clipboard output"}</span>
          <pre class="code-block" style="margin:0;min-height:96px">${esc(st.output)}</pre>
        </div>
      </div>
    `;

    mount.querySelectorAll("[data-gr-i]").forEach((b) => {
      b.addEventListener("click", () => {
        st.presetIdx = Number(b.dataset.grI);
        st.output = presets[st.presetIdx].greeting;
        renderGreeter(mount, lang);
      });
    });
    mount.querySelector("#grGreetBtn").addEventListener("click", () => {
      st.output = p.greeting;
      showToast("Greeter (Ctrl+Alt+A)", pt ? "Saudação copiada para a área de transferência" : "3-part greeting written to clipboard");
      renderGreeter(mount, lang);
    });
    mount.querySelector("#grPolishBtn").addEventListener("click", () => {
      st.output = p.polish;
      showToast("Greeter (Ctrl+Alt+S)", pt ? "Texto revisado copiado" : "Polished text written to clipboard");
      renderGreeter(mount, lang);
    });
  }

  function toMins(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  }

  function fmtTime(mins) {
    const wrapped = ((mins % 1440) + 1440) % 1440;
    const h = String(Math.floor(wrapped / 60)).padStart(2, "0");
    const m = String(wrapped % 60).padStart(2, "0");
    return `${h}:${m}`;
  }

  function renderHitTheClock(mount, lang) {
    const st = state.hittheclock;
    const pt = lang === "pt";
    const inM = toMins(st.clockIn);
    const lOutM = toMins(st.lunchOut);
    const lInM = toMins(st.lunchIn);
    const morningWorked = Math.max(0, lOutM - inM);
    const lunchDur = Math.max(0, lInM - lOutM);
    const remaining = Math.max(0, 480 - morningWorked);
    const exitM = lInM + remaining;

    mount.innerHTML = `
      <div class="demo-controls-row">
        <div class="field">
          <span class="field-label">${pt ? "Entrada" : "Clock-in"}</span>
          <input type="time" class="input tabular" id="htIn" value="${st.clockIn}">
        </div>
        <div class="field">
          <span class="field-label">${pt ? "Saída almoço" : "Lunch out"}</span>
          <input type="time" class="input tabular" id="htLOut" value="${st.lunchOut}">
        </div>
        <div class="field">
          <span class="field-label">${pt ? "Retorno almoço" : "Lunch return"}</span>
          <input type="time" class="input tabular" id="htLIn" value="${st.lunchIn}">
        </div>
        <div class="field">
          <span class="field-label">${pt ? "Dia simulado" : "Day guard"}</span>
          <div class="seg-group">
            <button type="button" class="seg-btn ${!st.weekend ? "active" : ""}" data-ht-wk="0">${pt ? "Dia útil" : "Weekday"}</button>
            <button type="button" class="seg-btn ${st.weekend ? "active" : ""}" data-ht-wk="1">${pt ? "Fim de semana" : "Weekend"}</button>
          </div>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-card">
          <div class="kpi-label">${pt ? "Turno manhã" : "Morning block"}</div>
          <div class="kpi-val">${Math.floor(morningWorked / 60)}h ${String(morningWorked % 60).padStart(2, "0")}m</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">${pt ? "Intervalo" : "Lunch break"}</div>
          <div class="kpi-val">${lunchDur} min</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">${pt ? "Saída prevista (8h)" : "Target exit (8h)"}</div>
          <div class="kpi-val accent">${fmtTime(exitM)}</div>
        </div>
      </div>

      <div class="demo-box row-between">
        <span class="mono-meta">Playwright guard: ${st.weekend ? (pt ? "Fim de semana detectado — execução abortada" : "Weekend detected — automation skipped") : (pt ? "Dia útil — pronto para confirmar no Tkinter" : "Weekday — ready for Tkinter confirmation")}</span>
        <span class="status-pill ${st.weekend ? "warning" : "positive"}"><span class="status-dot"></span>${st.weekend ? "Skipped" : "Armed"}</span>
      </div>
    `;

    mount.querySelector("#htIn").addEventListener("change", (e) => { st.clockIn = e.target.value; renderHitTheClock(mount, lang); });
    mount.querySelector("#htLOut").addEventListener("change", (e) => { st.lunchOut = e.target.value; renderHitTheClock(mount, lang); });
    mount.querySelector("#htLIn").addEventListener("change", (e) => { st.lunchIn = e.target.value; renderHitTheClock(mount, lang); });
    mount.querySelectorAll("[data-ht-wk]").forEach((b) => b.addEventListener("click", () => {
      st.weekend = b.dataset.htWk === "1";
      renderHitTheClock(mount, lang);
    }));
  }

  const RENDERERS = {
    "flylow": (mount, lang) => renderFlyLow(mount, lang, false),
    "radar-monitor": renderRadarMonitor,
    "lebet": renderLeBet,
    "aircatch": renderAirCatch,
    "jiramonitor": renderJiraMonitor,
    "blocklymaster": renderBlocklyMaster,
    "chatjira": renderChatJira,
    "csat": renderCsat,
    "bot-kb-gpt": renderBotKb,
    "alertbot": renderAlertBot,
    "testplan": renderTestPlan,
    "greeter": renderGreeter,
    "hittheclock": renderHitTheClock
  };

  window.PORTFOLIO_DEMOS = {
    renderHeroPreview(mount, lang) {
      renderFlyLow(mount, lang, true);
    },
    renderProjectDemo(id, mount, lang) {
      const fn = RENDERERS[id];
      if (fn) fn(mount, lang);
    }
  };
})();
