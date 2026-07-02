<!DOCTYPE html>
<html lang="th">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>แผนพัฒนาฯ ฉบับที่ 14</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet">
  <style>
    :root {
      --bg: #fafaf7;
      --paper: #fff;
      --ink: #0a0a0b;
      --ink2: #3f3f46;
      --ink3: #71717a;
      --ink4: #a1a1aa;
      --ln: rgba(10, 10, 11, .07);
      --ln2: rgba(10, 10, 11, .12);
      --ln3: rgba(10, 10, 11, .18);
      --top: #84a98c;
      --topbg: #e9efe7;
      --ss: 0 1px 2px rgba(10, 10, 11, .04);
      --sm: 0 1px 3px rgba(10, 10, 11, .04), 0 10px 24px -12px rgba(10, 10, 11, .10);
      --lg: 0 4px 8px rgba(10, 10, 11, .05), 0 24px 48px -16px rgba(10, 10, 11, .18);
      --foc: 0 8px 28px -8px rgba(10, 10, 11, .18);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html,
    body {
      background: var(--bg);
      color: var(--ink);
      font-family: 'IBM Plex Sans Thai', sans-serif;
      -webkit-font-smoothing: antialiased;
      min-height: 100vh;
    }

    body {
      position: relative;
      overflow-x: hidden;
    }

    body::before,
    body::after {
      content: '';
      position: fixed;
      width: 560px;
      height: 560px;
      border-radius: 50%;
      filter: blur(120px);
      opacity: .28;
      pointer-events: none;
      z-index: 0;
    }

    body::before {
      top: -200px;
      left: -160px;
      background: radial-gradient(circle, #a5f3fc, transparent 70%);
    }

    body::after {
      bottom: -240px;
      right: -160px;
      background: radial-gradient(circle, #ddd6fe, transparent 70%);
    }

    .canvas {
      position: relative;
      z-index: 1;
      /* max-width: 1320px; */
      margin: 0 auto;
      padding: 40px 32px 60px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .kicker {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--ink3);
      margin-bottom: 8px;
    }

    .pulse {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, .18);
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {

      0%,
      100% {
        transform: scale(1)
      }

      50% {
        transform: scale(1.3);
        opacity: .7
      }
    }

    .head-title {
      font-family: 'Prompt', sans-serif;
      font-weight: 600;
      font-size: 22px;
      letter-spacing: -.01em;
    }

    .head-sub {
      font-size: 13px;
      color: var(--ink3);
      margin-top: 2px;
    }

    .toolbar {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
      flex-wrap: wrap;
    }

    .btn {
      height: 36px;
      padding: 0 13px;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--ink2);
      background: var(--paper);
      border: 1px solid var(--ln2);
      border-radius: 10px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all .15s;
      box-shadow: var(--ss);
    }

    .btn:hover {
      color: var(--ink);
      border-color: rgba(10, 10, 11, .2);
      transform: translateY(-1px);
      box-shadow: var(--sm);
    }

    .btn.primary {
      background: var(--ink);
      color: #fff;
      border-color: var(--ink);
    }

    .btn.primary:hover {
      background: #1f1f23;
      color: #fff;
    }

    .btn svg {
      width: 13px;
      height: 13px;
      stroke-width: 2;
    }

    /* Tabs */
    .dash-tabs {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      padding: 6px;
      background: var(--paper);
      border: 1px solid var(--ln);
      border-radius: 14px;
      box-shadow: var(--ss);
      flex-wrap: wrap;
    }

    .tab-list {
      display: flex;
      gap: 4px;
      flex: 1;
      flex-wrap: wrap;
      min-width: 0;
    }

    .dash-tab {
      height: 36px;
      padding: 0 8px 0 12px;
      background: transparent;
      border: 0;
      border-radius: 9px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      color: var(--ink3);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all .2s;
      white-space: nowrap;
      max-width: 220px;
    }

    .dash-tab:hover {
      color: var(--ink);
      background: var(--bg);
    }

    .dash-tab.on {
      background: var(--ink);
      color: #fff;
      box-shadow: var(--sm);
    }

    .dash-tab .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      opacity: .5;
      flex-shrink: 0;
    }

    .dash-tab.on .dot {
      opacity: 1;
      background: #10b981;
    }

    .tab-name {
      overflow: hidden;
      text-overflow: ellipsis;
      outline: none;
      border-radius: 3px;
      padding: 1px 2px;
      max-width: 160px;
    }

    .tab-name.ed {
      background: rgba(255, 255, 255, .18);
    }

    .dash-tab:not(.on) .tab-name.ed {
      background: #fff;
      color: var(--ink);
      box-shadow: 0 0 0 1px var(--ink);
    }

    .tab-x {
      width: 20px;
      height: 20px;
      border: 0;
      background: transparent;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all .15s;
      color: inherit;
      padding: 0;
      flex-shrink: 0;
    }

    .dash-tab:hover .tab-x {
      opacity: .55;
    }

    .tab-x:hover {
      opacity: 1 !important;
      background: rgba(220, 38, 38, .18);
      color: #f87171;
    }

    .dash-tab.on .tab-x:hover {
      background: rgba(255, 255, 255, .2);
      color: #fff;
    }

    .tab-x svg {
      width: 11px;
      height: 11px;
      pointer-events: none;
    }

    .tab-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
      padding-left: 8px;
      border-left: 1px solid var(--ln);
    }

    .tab-btn {
      height: 36px;
      padding: 0 14px;
      background: transparent;
      border: 1px dashed var(--ln2);
      border-radius: 9px;
      font-family: inherit;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--ink2);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all .15s;
    }

    .tab-btn:hover {
      border-color: var(--ink);
      border-style: solid;
      color: var(--ink);
      background: var(--bg);
    }

    .tab-btn.copy {
      background: linear-gradient(135deg, #0e7490, #6d28d9 50%, #15803d);
      color: #fff;
      border: none;
    }

    .tab-btn.copy:hover {
      filter: brightness(1.1);
      color: #fff;
    }

    .tab-btn svg {
      width: 13px;
      height: 13px;
      stroke-width: 2;
    }

    /* Zoom */
    .zoom-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      justify-content: flex-end;
    }

    .zoom-btn {
      width: 32px;
      height: 32px;
      background: var(--paper);
      border: 1px solid var(--ln2);
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ink2);
      transition: all .15s;
      box-shadow: var(--ss);
    }

    .zoom-btn:hover {
      border-color: var(--ln3);
      color: var(--ink);
    }

    .zoom-btn svg {
      width: 14px;
      height: 14px;
      stroke-width: 2;
    }

    .zoom-lv {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: var(--ink3);
      min-width: 40px;
      text-align: center;
    }

    .zoom-fit {
      height: 28px;
      padding: 0 10px;
      background: transparent;
      border: 1px solid var(--ln2);
      border-radius: 6px;
      font-family: inherit;
      font-size: 11px;
      font-weight: 500;
      color: var(--ink3);
      cursor: pointer;
      transition: all .15s;
    }

    .zoom-fit:hover {
      border-color: var(--ln3);
      color: var(--ink);
    }

    /* Diagram */
    .diagram-wrap {
      background: var(--paper);
      border: 1px solid var(--ln);
      border-radius: 18px;
      position: relative;
      box-shadow: var(--sm);
      overflow: hidden;
    }

    .diagram-wrap::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at 1px 1px, rgba(10, 10, 11, .04) 1px, transparent 0);
      background-size: 24px 24px;
      pointer-events: none;
      opacity: .4;
    }

    .board-viewport {
      overflow: auto;
      position: relative;
    }

    .board-scaler {
      transform-origin: top left;
      transition: transform .25s cubic-bezier(.2, .7, .3, 1);
      padding: 48px 36px 56px;
      width: max-content;
      min-width: 100%;
    }

    .board-scaler.nt {
      transition: none;
    }

    .dInner {
      position: relative;
      z-index: 2;
      min-width: max-content;
    }

    .tree-lines {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 1;
      overflow: visible;
    }

    .tree-lines path {
      stroke: var(--ln3);
      stroke-width: 1.2;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: stroke .3s, stroke-width .3s, opacity .3s;
    }

    .tree-lines.foc path {
      opacity: .18;
    }

    .tree-lines.foc path.hi {
      opacity: 1;
      stroke-width: 2.2;
    }

    /* Plan card */
    .plan-top {
      display: flex;
      justify-content: center;
      margin-bottom: 60px;
    }

    .plan-card {
      background: var(--topbg);
      border: 1px solid #c5d5c3;
      padding: 18px 36px;
      border-radius: 12px;
      text-align: center;
      position: relative;
      min-width: 320px;
      box-shadow: var(--ss);
    }

    .plan-card::before {
      content: '';
      position: absolute;
      top: 8px;
      left: 8px;
      width: 10px;
      height: 10px;
      border-top: 1.5px solid var(--top);
      border-left: 1.5px solid var(--top);
    }

    .plan-card::after {
      content: '';
      position: absolute;
      bottom: 8px;
      right: 8px;
      width: 10px;
      height: 10px;
      border-bottom: 1.5px solid var(--top);
      border-right: 1.5px solid var(--top);
    }

    .plan-lbl {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: .25em;
      color: var(--top);
      text-transform: uppercase;
      margin-bottom: 4px;
      font-weight: 500;
    }

    .plan-ttl {
      font-family: 'Prompt', sans-serif;
      font-weight: 600;
      font-size: 16px;
      line-height: 1.4;
      letter-spacing: -.005em;
      outline: none;
      cursor: pointer;
      border-radius: 4px;
      padding: 2px 4px;
      margin: 0 -4px;
      display: inline-block;
    }

    .plan-ttl:focus,
    .plan-ttl[contenteditable="true"] {
      background: #fff8e6;
      box-shadow: 0 0 0 1.5px var(--top);
      cursor: text;
    }

    .plan-hint {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      color: var(--top);
      opacity: .55;
      letter-spacing: .15em;
      margin-top: 5px;
    }

    /* Board */
    .board {
      display: flex;
      gap: 32px;
      align-items: flex-start;
    }

    .pstack {
      flex: 1 1 280px;
      min-width: 280px;
      max-width: 360px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      --cm: #475569;
      --cb: #f8fafc;
      --ci: #334155;
      --cs: #f1f5f9;
      --cd: #cbd5e1;
    }

    .phead {
      background: var(--cb);
      border: 1px solid var(--cd);
      border-radius: 12px;
      padding: 18px 18px 16px 22px;
      min-height: 110px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      box-shadow: var(--ss);
      transition: filter .3s, opacity .3s, box-shadow .3s;
    }

    .phead.hi {
      box-shadow: 0 0 0 2px var(--cm), var(--foc);
    }

    .phead.dim {
      opacity: .35;
      filter: saturate(.4);
    }

    .prow {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .pnum {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: var(--cm);
    }

    .pdel {
      width: 22px;
      height: 22px;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 6px;
      color: var(--cm);
      opacity: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .15s;
    }

    .phead:hover .pdel {
      opacity: .65;
    }

    .pdel:hover {
      opacity: 1 !important;
      background: #fee2e2;
      border-color: #fecaca;
      color: #dc2626;
    }

    .pdel svg {
      width: 13px;
      height: 13px;
      stroke-width: 2;
      pointer-events: none;
    }

    .ptitle {
      font-family: 'Prompt', sans-serif;
      font-weight: 600;
      font-size: 15px;
      line-height: 1.4;
      color: var(--ci);
      outline: none;
      border-radius: 4px;
      padding: 2px 4px;
      margin: 0 -4px;
      cursor: pointer;
    }

    .ptitle:focus,
    .ptitle[contenteditable="true"] {
      background: #fff8e6;
      box-shadow: 0 0 0 1px var(--cm);
      cursor: text;
    }

    .bcol {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .box {
      background: var(--paper);
      border: 1px solid var(--ln2);
      border-left: 3px solid var(--cm);
      border-radius: 10px;
      cursor: pointer;
      position: relative;
      box-shadow: var(--ss);
      transition: all .35s cubic-bezier(.2, .7, .3, 1);
      overflow: hidden;
    }

    .box:hover:not(.open) {
      border-color: var(--ink);
      border-left-color: var(--cm);
      transform: translateY(-2px);
      box-shadow: var(--sm);
    }

    .box.dim {
      opacity: .3;
      filter: saturate(.5);
    }

    .box.open {
      cursor: default;
      box-shadow: var(--foc);
      transform: none;
      border-color: var(--cm);
    }

    .box-head {
      padding: 18px 18px 16px;
      position: relative;
    }

    .box-num {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: .18em;
      color: var(--ink4);
      margin-bottom: 8px;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 26px;
    }

    .box-num .sid {
      color: var(--cm);
    }

    .box-num .meta {
      color: var(--ink3);
      text-transform: none;
      letter-spacing: .05em;
    }

    .bdel {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 22px;
      height: 22px;
      background: var(--paper);
      border: 1px solid var(--ln2);
      border-radius: 6px;
      color: var(--ink3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transition: all .15s;
      z-index: 3;
    }

    .box:hover .bdel {
      opacity: .65;
    }

    .box.open .bdel {
      opacity: 0 !important;
      pointer-events: none;
    }

    .bdel:hover {
      opacity: 1 !important;
      background: #fee2e2;
      border-color: #fecaca;
      color: #dc2626;
    }

    .bdel svg {
      width: 12px;
      height: 12px;
      stroke-width: 2;
      pointer-events: none;
    }

    .box.first .bdel {
      display: none;
    }

    .btitle {
      font-family: 'Prompt', sans-serif;
      font-weight: 500;
      font-size: 14.5px;
      line-height: 1.45;
      color: var(--ink);
      outline: none;
      cursor: pointer;
      border-radius: 4px;
      padding: 2px 4px;
      margin: 0 -4px;
    }

    .btitle:focus,
    .btitle[contenteditable="true"] {
      background: #fff8e6;
      box-shadow: 0 0 0 1px var(--cm);
      cursor: text;
    }

    .bbox {
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height .4s cubic-bezier(.2, .7, .3, 1), opacity .25s;
    }

    .box.open .bbox {
      max-height: 2400px;
      opacity: 1;
    }

    .bbox-in {
      padding: 0 18px 18px;
      border-top: 1px dashed var(--ln2);
      margin-top: 4px;
      padding-top: 14px;
    }

    .linkage {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      letter-spacing: .1em;
      color: var(--ink4);
      text-transform: uppercase;
      margin-bottom: 14px;
      padding: 8px 10px;
      background: var(--bg);
      border-radius: 6px;
      line-height: 1.4;
    }

    .linkage .arrow {
      color: var(--ink4);
    }

    .crumb {
      padding: 2px 6px;
      border-radius: 4px;
    }

    .crumb.now {
      background: var(--cs);
      color: var(--ci);
    }

    .ilist {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 6px;
    }

    .irow {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 9px 10px 9px 12px;
      border-radius: 8px;
      background: var(--bg);
      border: 1px solid transparent;
      font-size: 13.5px;
      line-height: 1.5;
      color: var(--ink2);
      transition: all .15s;
    }

    .irow .dot2 {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-top: 8px;
      background: var(--cm);
    }

    .itext {
      flex: 1;
      outline: none;
      word-break: break-word;
    }

    .box.em .irow {
      background: var(--paper);
      border-color: var(--ln2);
    }

    .box.em .irow:focus-within {
      border-color: var(--ink);
      box-shadow: var(--ss);
    }

    .box.em .itext {
      cursor: text;
    }

    .idel {
      width: 22px;
      height: 22px;
      border: 0;
      background: transparent;
      border-radius: 6px;
      cursor: pointer;
      color: var(--ink4);
      display: none;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all .15s;
    }

    .box.em .idel {
      display: inline-flex;
    }

    .idel:hover {
      background: #fee2e2;
      color: #dc2626;
    }

    .idel svg {
      width: 13px;
      height: 13px;
      pointer-events: none;
    }

    .addrow {
      display: none;
      margin-top: 8px;
    }

    .box.em .addrow {
      display: block;
    }

    .addinput {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--paper);
      border: 1px dashed var(--ln2);
      border-radius: 8px;
      padding: 4px 4px 4px 12px;
    }

    .addinput input {
      flex: 1;
      border: 0;
      outline: none;
      background: transparent;
      padding: 8px 0;
      font-family: inherit;
      font-size: 13.5px;
      color: var(--ink);
    }

    .addinput input::placeholder {
      color: var(--ink4);
    }

    .mini {
      height: 28px;
      padding: 0 11px;
      font-size: 11.5px;
      font-weight: 500;
      border-radius: 6px;
      border: 0;
      cursor: pointer;
      font-family: inherit;
    }

    .mini.go {
      background: var(--ink);
      color: #fff;
    }

    .mini.go:disabled {
      opacity: .4;
      cursor: not-allowed;
    }

    .mini.no {
      background: transparent;
      color: var(--ink3);
    }

    .mini.no:hover {
      color: var(--ink);
    }

    .bfoot {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px dashed var(--ln2);
    }

    .bfinfo {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: var(--ink4);
      letter-spacing: .12em;
      text-transform: uppercase;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 160px;
    }

    .bfact {
      display: flex;
      gap: 6px;
    }

    .mbtn {
      height: 30px;
      padding: 0 12px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      border-radius: 7px;
      border: 1px solid var(--ln2);
      background: var(--paper);
      color: var(--ink2);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all .15s;
    }

    .mbtn:hover {
      border-color: var(--ink);
      color: var(--ink);
    }

    .mbtn.solid {
      background: var(--ink);
      color: #fff;
      border-color: var(--ink);
    }

    .mbtn.solid:hover {
      background: #1f1f23;
    }

    .mbtn svg {
      width: 12px;
      height: 12px;
      stroke-width: 2;
      pointer-events: none;
    }

    .box.em .bedit {
      display: none;
    }

    .box:not(.em) .bdone {
      display: none;
    }

    /* Add strategy */
    .as-btn {
      width: 100%;
      background: transparent;
      border: 1.5px dashed var(--ln2);
      border-radius: 10px;
      padding: 14px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      color: var(--ink3);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all .15s;
    }

    .as-btn:hover {
      border-color: var(--cm);
      color: var(--cm);
      background: var(--cb);
    }

    .as-btn svg {
      width: 14px;
      height: 14px;
    }

    .as-form {
      display: none;
      background: var(--paper);
      border: 1px solid var(--ink);
      border-radius: 10px;
      padding: 4px 4px 4px 12px;
      align-items: center;
      gap: 6px;
    }

    .as-form.show {
      display: flex;
    }

    .as-form input {
      flex: 1;
      border: 0;
      outline: none;
      background: transparent;
      padding: 8px 0;
      font-family: inherit;
      font-size: 13.5px;
      color: var(--ink);
    }

    /* Add pillar */
    .ap-stack {
      flex: 0 0 auto;
      align-self: flex-start;
    }

    .ap-btn {
      height: 110px;
      width: 140px;
      background: transparent;
      border: 1.5px dashed var(--ln2);
      border-radius: 12px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      color: var(--ink3);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all .2s;
    }

    .ap-btn:hover {
      border-color: var(--ink);
      border-style: solid;
      color: var(--ink);
      background: var(--bg);
      transform: translateY(-2px);
    }

    .ap-btn svg {
      width: 18px;
      height: 18px;
    }

    .ap-form {
      display: none;
      flex-direction: column;
      gap: 8px;
      width: 220px;
      padding: 14px;
      background: var(--paper);
      border: 1px solid var(--ink);
      border-radius: 12px;
    }

    .ap-form.show {
      display: flex;
    }

    .ap-form input {
      border: 1px solid var(--ln2);
      outline: none;
      background: var(--paper);
      padding: 8px 10px;
      border-radius: 6px;
      font-family: inherit;
      font-size: 13.5px;
      color: var(--ink);
      width: 100%;
    }

    .ap-form input:focus {
      border-color: var(--ink);
    }

    .ap-form .row {
      display: flex;
      gap: 6px;
    }

    .ap-form .row .mini {
      flex: 1;
    }

    /* Inline confirm */
    .ic {
      display: none;
      background: #fff7ed;
      border: 1px solid #fed7aa;
      border-radius: 8px;
      padding: 10px 12px;
      margin: 6px 0;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      color: var(--ink);
    }

    .ic.show {
      display: flex;
    }

    .ic .icmsg {
      flex: 1;
      line-height: 1.5;
    }

    .ic .icy {
      height: 26px;
      padding: 0 12px;
      background: #dc2626;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      font-family: inherit;
      white-space: nowrap;
    }

    .ic .icn {
      height: 26px;
      padding: 0 12px;
      background: transparent;
      border: 1px solid var(--ln2);
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      font-family: inherit;
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: var(--ink);
      color: #fff;
      padding: 11px 18px;
      border-radius: 10px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 500;
      box-shadow: var(--lg);
      opacity: 0;
      pointer-events: none;
      transition: all .25s;
      z-index: 200;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .tok {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
    }

    footer {
      margin-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      color: var(--ink4);
      letter-spacing: .15em;
      text-transform: uppercase;
    }

    .live {
      color: #059669;
    }

    .online-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      margin-left: 16px;
      padding: 2px 10px 2px 8px;
      border-radius: 100px;
      background: rgba(5, 150, 105, .1);
      border: 1px solid rgba(5, 150, 105, .2);
      font-size: 10px;
      color: #059669;
      letter-spacing: .05em;
      text-transform: none;
    }

    @media(max-width:900px) {
      header {
        flex-direction: column;
        align-items: flex-start;
      }

      .tab-actions {
        border-left: 0;
        padding-left: 0;
      }

      .head-title {
        font-size: 18px;
      }

      .pstack {
        min-width: 260px;
      }
    }

    @media(max-width:560px) {
      .canvas {
        padding: 24px 14px 40px;
      }
    }

    @media print {

      body::before,
      body::after,
      .toolbar,
      footer,
      .toast,
      .bfoot,
      .addrow,
      .idel,
      .bdel,
      .as-btn,
      .ap-stack,
      .pdel,
      .dash-tabs,
      .zoom-bar,
      .ic {
        display: none !important;
      }

      .canvas {
        padding: 8px;
        max-width: 100%;
      }

      .diagram-wrap {
        box-shadow: none;
        border: none;
      }

      .board-scaler {
        padding: 16px;
        transform: none !important;
      }

      .box {
        box-shadow: none;
      }

      .bbox {
        max-height: none !important;
        opacity: 1 !important;
      }

      @page {
        size: A4 landscape;
        margin: 8mm;
      }
    }
  </style>
</head>

<body>
  <div class="canvas">
    <header>
      <div>
        <div class="kicker"><span class="pulse"></span>National Plan · Strategic Linkage</div>
        <div class="head-title">โครงสร้างความเชื่อมโยง · แผน 14</div>
        <div class="head-sub">ดับเบิ้ลคลิกชื่อเพื่อแก้ไข · zoom ได้ที่แถบด้านบน · บันทึกอัตโนมัติ</div>
      </div>
      <div class="toolbar">
        <button class="btn" id="btnExport"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>Export</button>
        <button class="btn" id="btnImport"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>Import</button>
        <input type="file" id="fileIn" accept=".json" style="display:none">
        <button class="btn" id="btnReset"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
          </svg>Reset</button>
        <button class="btn primary" onclick="window.print()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z" />
          </svg>Print</button>
      </div>
    </header>
    <div class="dash-tabs">
      <div class="tab-list" id="tabList"></div>
      <div class="tab-actions">
        <button class="tab-btn copy" id="btnCopy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>Copy</button>
        <button class="tab-btn" id="btnNew"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14" />
          </svg>ใหม่</button>
      </div>
    </div>
    <div class="zoom-bar">
      <button class="zoom-btn" id="zOut"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14" />
        </svg></button>
      <span class="zoom-lv" id="zLv">100%</span>
      <button class="zoom-btn" id="zIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12h14" />
        </svg></button>
      <button class="zoom-fit" id="zFit">Fit</button>
    </div>
    <div class="diagram-wrap">
      <div class="board-viewport" id="vp">
        <div class="board-scaler" id="scaler">
          <div class="dInner" id="dInner">
            <svg class="tree-lines" id="svg"></svg>
            <div class="plan-top">
              <div class="plan-card" id="planCard">
                <div class="plan-lbl">PLAN · 14</div>
                <div class="plan-ttl" id="planTtl" contenteditable="false" spellcheck="false" tabindex="0">
                  แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ ฉบับที่ 14</div>
                <div class="plan-hint">double click to edit</div>
              </div>
            </div>
            <div class="board" id="board"></div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div>NESDC · NATIONAL PLAN 14 · STRATEGIC LINKAGE</div>
      <div><span id="finfo"></span><span class="live">●</span> AUTOSAVED<span class="online-badge"
          id="onlineBadge"><span>●</span> <span id="onlineCount">0</span> online</span></div>
    </footer>
  </div>
  <div class="toast" id="toast"><span class="tok"></span><span id="tmsg"></span></div>
  <script>
    const PAL=[
  {m:'#0e7490',b:'#ecfeff',i:'#155e75',s:'#cffafe',d:'#a5e8ee'},
  {m:'#6d28d9',b:'#f5f3ff',i:'#5b21b6',s:'#ede9fe',d:'#d2c3f7'},
  {m:'#15803d',b:'#f0fdf4',i:'#166534',s:'#dcfce7',d:'#b1e3c1'},
  {m:'#b45309',b:'#fffbeb',i:'#92400e',s:'#fef3c7',d:'#fcd34d'},
  {m:'#be123c',b:'#fff1f2',i:'#9f1239',s:'#ffe4e6',d:'#fda4af'},
  {m:'#0d9488',b:'#f0fdfa',i:'#115e59',s:'#ccfbf1',d:'#5eead4'},
  {m:'#4338ca',b:'#eef2ff',i:'#3730a3',s:'#e0e7ff',d:'#a5b4fc'},
  {m:'#c2410c',b:'#fff7ed',i:'#9a3412',s:'#ffedd5',d:'#fdba74'}
];
const pc=i=>PAL[i%PAL.length];
const uid=(p='x')=>p+Math.random().toString(36).slice(2,8);
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const DEF=[
  {t:'เศรษฐกิจขยายตัวสูงขึ้น',ss:[
    {t:'การยกระดับผลิตภาพการผลิตและบริการ',items:['การส่งเสริมการลงทุนในเทคโนโลยีและนวัตกรรม','การพัฒนาระบบ Automation และ Smart Manufacturing','การยกระดับมาตรฐานการผลิตและบริการ','การส่งเสริมการวิจัยและพัฒนา (R&D)','การพัฒนาห่วงโซ่อุปทาน (Supply Chain) ระดับสากล','การเพิ่มประสิทธิภาพการใช้พลังงานในภาคอุตสาหกรรม']},
    {t:'การยกระดับฝีมือแรงงาน',items:['การพัฒนาทักษะดิจิทัล (Digital Skills) ในแรงงานทุกระดับ','การ Reskill / Upskill แรงงานในอุตสาหกรรมเป้าหมาย','การพัฒนาระบบรับรองมาตรฐานฝีมือแรงงาน','การส่งเสริมการเรียนรู้ตลอดชีวิต (Lifelong Learning)','การพัฒนาการศึกษาสายอาชีพและทวิภาคี','ความร่วมมือสถาบันการศึกษากับภาคอุตสาหกรรม']},
    {t:'การเพิ่มขีดความสามารถการแข่งขันให้ภาคธุรกิจ',items:['การส่งเสริม SMEs และ Startups ให้เข้าถึงแหล่งทุน','การลดอุปสรรคทางการค้าและการลงทุน','การพัฒนาโครงสร้างพื้นฐานดิจิทัลและ 5G','การส่งเสริมการส่งออกและการขยายตลาดต่างประเทศ','การพัฒนาระบบโลจิสติกส์และห่วงโซ่อุปทาน','การส่งเสริมเศรษฐกิจสร้างสรรค์ (Creative Economy)']}
  ]},
  {t:'ประชาชนมีส่วนร่วมและได้รับประโยชน์จากการขยายตัวทางเศรษฐกิจอย่างทั่วถึง',ss:[
    {t:'การเข้าถึงสวัสดิการ',items:['การพัฒนาระบบหลักประกันสุขภาพถ้วนหน้าให้ครอบคลุม','การขยายสวัสดิการแก่แรงงานนอกระบบและอาชีพอิสระ','การพัฒนาระบบบำนาญและการออมเพื่อวัยเกษียณ','สวัสดิการสำหรับผู้สูงอายุและคนพิการ','สวัสดิการเด็กและการสนับสนุนครอบครัว','การเข้าถึงบริการสาธารณะอย่างเท่าเทียม']},
    {t:'การลดความเหลื่อมล้ำทุกมิติ',items:['การลดความเหลื่อมล้ำด้านรายได้และความมั่งคั่ง','การกระจายโอกาสทางการศึกษาให้ทั่วถึงและมีคุณภาพ','การลดความเหลื่อมล้ำเชิงพื้นที่ระหว่างชนบทกับเมือง','การส่งเสริมความเท่าเทียมทางเพศและกลุ่มเปราะบาง','การเข้าถึงทรัพยากร ที่ดินทำกิน และแหล่งทุน','การลดความเหลื่อมล้ำทางดิจิทัล (Digital Divide)']},
    {t:'การสร้างโอกาสให้ทุกคนเข้าถึงการทำงาน',items:['การส่งเสริมการจ้างงานในพื้นที่และภูมิภาค','การสนับสนุนผู้ประกอบการรายย่อยและวิสาหกิจชุมชน','การจ้างงานคนพิการและผู้สูงอายุ','การพัฒนาตลาดแรงงานที่ยืดหยุ่นและเป็นธรรม','การส่งเสริมเศรษฐกิจฐานรากและเศรษฐกิจชุมชน','การพัฒนาทักษะการประกอบอาชีพอิสระและฟรีแลนซ์']}
  ]},
  {t:'เศรษฐกิจเติบโตอย่างยั่งยืน',ss:[
    {t:'สิ่งแวดล้อม',items:['การลดการปล่อยก๊าซเรือนกระจกตามเป้าหมาย Net Zero','การส่งเสริมพลังงานสะอาดและพลังงานหมุนเวียน','การจัดการขยะและของเสียอย่างยั่งยืน','การอนุรักษ์ทรัพยากรน้ำ ป่าไม้ และความหลากหลายทางชีวภาพ','การส่งเสริมเศรษฐกิจหมุนเวียน (Circular Economy)','การปรับตัวต่อการเปลี่ยนแปลงสภาพภูมิอากาศ']}
  ]}
];
const mkTab=(name,blank)=>{
  const P=[],B=[];
  if(blank){const p={id:uid('p'),t:'xxx'};P.push(p);for(let i=0;i<3;i++)B.push({id:uid('b'),pid:p.id,t:'xxx',items:[]});}
  else{DEF.forEach(d=>{const p={id:uid('p'),t:d.t};P.push(p);d.ss.forEach(s=>B.push({id:uid('b'),pid:p.id,t:s.t,items:[...s.items]}));});}
  return{id:uid('t'),name,planT:blank?'xxx':'แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ ฉบับที่ 14',pillars:P,boxes:B};
};
const API_URL = '/app/plan14/api/data';
const CSRF = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
let S = null;
let saveTimer = null;

const mkState=()=>{const t=mkTab('แผน 14',false);return{tabs:[t],aid:t.id};};

const load=async()=>{
  try{
    const r=await fetch(API_URL);if(!r.ok)throw 0;
    const d=await r.json();
    if(d&&Array.isArray(d.tabs)&&d.tabs.length){
      if(!d.aid||!d.tabs.find(t=>t.id===d.aid))d.aid=d.tabs[0].id;
      d.tabs.forEach(t=>{if(!t.planT)t.planT='แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ ฉบับที่ 14';});
      return d;
    }
  }catch(e){}
  return mkState();
};

const save=()=>{
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
    fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-TOKEN':CSRF},body:JSON.stringify(S)});
  },500);
};
const sync=(action,data)=>{
  fetch('/app/plan14/api/sync',{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-TOKEN':CSRF},body:JSON.stringify({action,data})});
};
const tab=()=>S.tabs.find(t=>t.id===S.aid);
const pillars=()=>tab()?.pillars||[];
const boxes=()=>tab()?.boxes||[];
const findBox=id=>boxes().find(b=>b.id===id);
const findPillar=id=>pillars().find(p=>p.id===id);
const pillarIdx=id=>pillars().findIndex(p=>p.id===id);
const setCV=(el,i)=>{const c=pc(i);['m','b','i','s','d'].forEach((k,j)=>el.style.setProperty(['--cm','--cb','--ci','--cs','--cd'][j],c[k]));};

/* ── Inline confirm (no native dialog needed) ── */
function mkIC(msg,onYes,onNo){
  const ic=document.createElement('div');
  ic.className='ic show';
  ic.innerHTML=`<span class="icmsg">${esc(msg)}</span><button class="icn">ยกเลิก</button><button class="icy">ลบ</button>`;
  ic.querySelector('.icy').onclick=()=>{ic.remove();onYes();};
  ic.querySelector('.icn').onclick=()=>{ic.remove();if(onNo)onNo();};
  return ic;
}

/* ── Zoom ── */
let Z=1;
const ZS=[.25,.33,.5,.67,.75,.8,.9,1,1.1,1.25,1.5,1.75,2];
const setZ=(v,anim=true)=>{const sc=document.getElementById('scaler');if(!sc)return;Z=Math.max(.25,Math.min(2,v));if(!anim)sc.classList.add('nt');sc.style.transform=`scale(${Z})`;const inn=sc.querySelector('.dInner');if(inn)sc.style.height=(inn.scrollHeight*Z+96)+'px';document.getElementById('zLv').textContent=Math.round(Z*100)+'%';if(!anim){sc.offsetHeight;sc.classList.remove('nt');}setTimeout(drawLines,40);};
const zStep=d=>{const i=ZS.findIndex(s=>Math.abs(s-Z)<.01);if(d>0)setZ(ZS[Math.min(ZS.length-1,i<0?ZS.findIndex(s=>s>Z):i+1)]);else setZ(ZS[Math.max(0,i<0?ZS.length-1-[...ZS].reverse().findIndex(s=>s<Z):i-1)]);};
document.getElementById('zIn').onclick=()=>zStep(1);
document.getElementById('zOut').onclick=()=>zStep(-1);
document.getElementById('zFit').onclick=()=>{const b=document.getElementById('board'),v=document.getElementById('vp');if(b&&v)setZ(Math.max(.25,Math.min(1,(v.clientWidth-32)/(b.scrollWidth+72))));else setZ(1);};
document.getElementById('vp').addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey){e.preventDefault();zStep(e.deltaY<0?1:-1);}},{passive:false});

/* ── Toast ── */
let tT=null;
const toast=msg=>{document.getElementById('tmsg').textContent=msg;const el=document.getElementById('toast');el.classList.add('show');clearTimeout(tT);tT=setTimeout(()=>el.classList.remove('show'),1800);};

/* ── Tab bar ── */
const renderTabs=()=>{
  const list=document.getElementById('tabList');list.innerHTML='';
  S.tabs.forEach(t=>{
    const el=document.createElement('div');
    el.className='dash-tab'+(t.id===S.aid?' on':'');
    el.innerHTML=`<span class="dot"></span><span class="tab-name" spellcheck="false">${esc(t.name)}</span><button class="tab-x" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg></button>`;
    const nm=el.querySelector('.tab-name');
    const xb=el.querySelector('.tab-x');
    el.addEventListener('click',e=>{if(e.target.closest('.tab-x'))return;if(nm.classList.contains('ed'))return;if(t.id!==S.aid)switchTab(t.id);});
    nm.addEventListener('dblclick',e=>{e.stopPropagation();nm.contentEditable='true';nm.classList.add('ed');nm.focus();const r=document.createRange();r.selectNodeContents(nm);const s=window.getSelection();s.removeAllRanges();s.addRange(r);});
    nm.addEventListener('blur',()=>{const v=nm.textContent.trim();if(v&&v!==t.name){t.name=v;sync('renameTab',{tabUuid:t.id,name:v});updateFoot();}else nm.textContent=t.name;nm.contentEditable='false';nm.classList.remove('ed');});
    nm.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();nm.blur();}if(e.key==='Escape'){nm.textContent=t.name;nm.blur();}});
      xb.addEventListener('click',e=>{
        e.stopPropagation();e.preventDefault();
        const isLast=S.tabs.length===1;
        const msg=isLast?`ลบ "${t.name}" และสร้าง Dashboard ใหม่?`:`ลบแท็บ "${t.name}"?`;
        const ic=mkIC(msg,()=>{
          if(isLast){
            sync('deleteTab',{tabUuid:t.id});
            (async()=>{S=await load();expandedId=null;renderTabs();renderBoard();drawLines();updateFoot();toast('ลบและสร้างใหม่แล้ว');})();
          }else{
            const idx=S.tabs.findIndex(x=>x.id===t.id);
            S.tabs.splice(idx,1);
            if(S.aid===t.id)S.aid=S.tabs[Math.max(0,idx-1)].id;
            sync('deleteTab',{tabUuid:t.id});sync('setAid',{aid:S.aid});
            expandedId=null;renderTabs();renderBoard();drawLines();updateFoot();
            toast('ลบแท็บแล้ว');
          }
        });
        el.parentNode.insertBefore(ic,el.nextSibling);
      });
    list.appendChild(el);
  });
};
const switchTab=id=>{if(id===S.aid)return;expandedId=null;S.aid=id;sync('setAid',{aid:id});renderTabs();renderBoard();drawLines();updateFoot();syncPlanT();};
const updateFoot=()=>{const t=tab();if(t)document.getElementById('finfo').textContent=`${t.name} · ${t.pillars.length} PILLARS · ${t.boxes.length} STRATEGIES · `;};
document.getElementById('btnCopy').addEventListener('click',()=>{
  const cur=tab();if(!cur)return;
  const pm={};const np=cur.pillars.map(p=>{const nid=uid('p');pm[p.id]=nid;return{id:nid,t:p.t};});
  const nb=cur.boxes.map(b=>({id:uid('b'),pid:pm[b.pid]||np[0]?.id,t:b.t,items:[...(b.items||[])]}));
  const cl={id:uid('t'),name:`${cur.name} (สำเนา)`,planT:cur.planT,pillars:np,boxes:nb};
  S.tabs.push(cl);S.aid=cl.id;sync('addTab',{tabUuid:cl.id,name:cl.name,planT:cl.planT,pillars:cl.pillars,boxes:cl.boxes});expandedId=null;renderTabs();renderBoard();drawLines();updateFoot();syncPlanT();
  toast(`สร้างสำเนา "${cl.name}" แล้ว`);
});
document.getElementById('btnNew').addEventListener('click',()=>{
  const n=S.tabs.length+1;const t=mkTab(`Dashboard ${n}`,true);
  S.tabs.push(t);S.aid=t.id;sync('addTab',{tabUuid:t.id,name:t.name,planT:t.planT,pillars:t.pillars,boxes:t.boxes});expandedId=null;renderTabs();renderBoard();drawLines();updateFoot();syncPlanT();
  toast(`สร้าง "${t.name}" ใหม่แล้ว`);
});

/* ── Plan title ── */
const syncPlanT=()=>{const t=tab();const el=document.getElementById('planTtl');if(t&&el)el.textContent=t.planT;};
(()=>{
  const el=document.getElementById('planTtl');if(!el)return;
  const edit=()=>{el.contentEditable='true';el.focus();const r=document.createRange();r.selectNodeContents(el);const s=window.getSelection();s.removeAllRanges();s.addRange(r);};
  el.addEventListener('dblclick',e=>{e.stopPropagation();edit();});
  el.addEventListener('click',e=>{const t=tab();if(t&&t.planT==='xxx'){e.stopPropagation();edit();}});
  el.addEventListener('blur',()=>{const v=el.textContent.trim();const t=tab();if(t){if(v&&v!==t.planT){t.planT=v;sync('renamePlanTitle',{tabUuid:t.id,planT:v});toast('เปลี่ยนชื่อแผนแล้ว');}else el.textContent=t.planT;}el.contentEditable='false';});
  el.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();el.blur();}if(e.key==='Escape'){const t=tab();if(t)el.textContent=t.planT;el.blur();}});
})();

/* ── Board ── */
const renderBoard=()=>{
  const b=document.getElementById('board');b.innerHTML='';
  pillars().forEach((p,i)=>b.appendChild(mkPillar(p,i)));
  b.appendChild(mkAddPillar());
  syncPlanT();setTimeout(()=>setZ(Z,false),10);
};

const mkPillar=(p,idx)=>{
  const stack=document.createElement('div');stack.className='pstack';stack.dataset.pid=p.id;setCV(stack,idx);
  const head=document.createElement('div');head.className='phead';head.dataset.pid=p.id;
  const num=String(idx+1).padStart(2,'0');
  head.innerHTML=`<div class="prow"><div class="pnum">PILLAR · ${num}</div><button class="pdel" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/></svg></button></div><div class="ptitle" spellcheck="false">${esc(p.t)}</div>`;
  const ttl=head.querySelector('.ptitle');
  const editP=()=>{ttl.contentEditable='true';ttl.focus();const r=document.createRange();r.selectNodeContents(ttl);const s=window.getSelection();s.removeAllRanges();s.addRange(r);};
  ttl.addEventListener('dblclick',e=>{e.stopPropagation();editP();});
  ttl.addEventListener('click',e=>{if(p.t==='xxx'){e.stopPropagation();editP();}});
  ttl.addEventListener('blur',()=>{const v=ttl.textContent.trim();if(v&&v!==p.t){p.t=v;sync('renamePillar',{pillarUuid:p.id,title:v});}else ttl.textContent=p.t;ttl.contentEditable='false';});
  ttl.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();ttl.blur();}if(e.key==='Escape'){ttl.textContent=p.t;ttl.blur();}});
  head.querySelector('.pdel').addEventListener('click',e=>{
    e.stopPropagation();
    const t=tab();const bc=t.boxes.filter(b=>b.pid===p.id).length;
    const msg=bc>0?`ลบ Pillar "${p.t}" และ ${bc} Strategy ภายใน?`:`ลบ Pillar "${p.t}"?`;
    const ic=mkIC(msg,()=>{
      t.pillars=t.pillars.filter(x=>x.id!==p.id);t.boxes=t.boxes.filter(b=>b.pid!==p.id);sync('deletePillar',{pillarUuid:p.id});
      if(expandedId&&!findBox(expandedId))expandedId=null;
      renderBoard();drawLines();updateFoot();toast('ลบ Pillar แล้ว');
    });
    head.appendChild(ic);
  });
  stack.appendChild(head);
  const col=document.createElement('div');col.className='bcol';
  boxes().filter(b=>b.pid===p.id).forEach((b,i)=>col.appendChild(mkBox(b,idx+1,i+1,i===0)));
  col.appendChild(mkAS(p));
  stack.appendChild(col);return stack;
};

const mkBox=(box,pi,di,isFirst)=>{
  const el=document.createElement('div');
  el.className='box'+(isFirst?' first':'');
  el.dataset.id=box.id;el.dataset.pid=box.pid;el.id='b'+box.id;
  const items=box.items||[];const p=findPillar(box.pid);
  const pn=String(pi).padStart(2,'0');const sl=`${pi}.${di}`;
  el.innerHTML=`<div class="box-head">${isFirst?'':'<button class="bdel" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z"/></svg></button>'}<div class="box-num"><span class="sid">STRATEGY ${sl}</span><span class="meta">${items.length} หัวข้อย่อย</span></div><div class="btitle" spellcheck="false">${esc(box.t)}</div></div><div class="bbox"><div class="bbox-in"><div class="linkage"><span class="crumb">PLAN 14</span><span class="arrow">→</span><span class="crumb">PILLAR ${pn}</span><span class="arrow">→</span><span class="crumb now">STRATEGY ${sl}</span></div><ul class="ilist">${items.map((t,i)=>`<li class="irow" data-i="${i}"><span class="dot2"></span><span class="itext" contenteditable="false" spellcheck="false">${esc(t)}</span><button class="idel" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg></button></li>`).join('')}</ul><div class="addrow"><div class="addinput"><input type="text" placeholder="เพิ่มหัวข้อย่อยใหม่..."/><button class="mini go" disabled type="button">เพิ่ม</button></div></div><div class="bfoot"><div class="bfinfo">ภายใต้ ${esc(p?p.t:'—')}</div><div class="bfact"><button class="mbtn bedit" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>แก้ไข</button><button class="mbtn solid bdone" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>เสร็จสิ้น</button><button class="mbtn bclose" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div></div></div></div>`;
  const bt=el.querySelector('.btitle');
  const editBT=()=>{bt.contentEditable='true';bt.focus();const r=document.createRange();r.selectNodeContents(bt);const s=window.getSelection();s.removeAllRanges();s.addRange(r);};
  bt.addEventListener('dblclick',e=>{e.stopPropagation();if(el.classList.contains('open'))editBT();else openBox(box.id);});
  bt.addEventListener('click',e=>{if(el.classList.contains('open')&&box.t==='xxx'){e.stopPropagation();editBT();}});
  bt.addEventListener('blur',()=>{const v=bt.textContent.trim();if(v&&v!==box.t){box.t=v;sync('renameBox',{boxUuid:box.id,title:v});}else bt.textContent=box.t;bt.contentEditable='false';});
  bt.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();bt.blur();}if(e.key==='Escape'){bt.textContent=box.t;bt.blur();}});
  el.querySelector('.box-head').addEventListener('click',e=>{if(e.target.closest('.bdel'))return;if(bt.contentEditable==='true')return;if(el.classList.contains('open'))return;openBox(box.id);});
  const bd=el.querySelector('.bdel');
  if(bd)bd.addEventListener('click',e=>{
    e.stopPropagation();
      const ic=mkIC(`ลบ Strategy "${box.t}"?`,()=>{
        const t=tab();t.boxes=t.boxes.filter(b=>b.id!==box.id);sync('deleteBox',{boxUuid:box.id});
        if(expandedId===box.id)expandedId=null;renderBoard();drawLines();updateFoot();toast('ลบ Strategy แล้ว');
      });
    el.querySelector('.box-head').appendChild(ic);
  });
  el.querySelector('.bedit').addEventListener('click',e=>{e.stopPropagation();enterE(el);});
  el.querySelector('.bdone').addEventListener('click',e=>{e.stopPropagation();exitE(el);toast('บันทึกแล้ว');});
  el.querySelector('.bclose').addEventListener('click',e=>{e.stopPropagation();closeAll();});
  el.querySelectorAll('.irow').forEach((row,i)=>{
    const it=row.querySelector('.itext');
    it.addEventListener('blur',()=>{if(!el.classList.contains('em'))return;const v=it.textContent.trim();if(v&&v!==box.items[i]){box.items[i]=v;sync('editItem',{boxUuid:box.id,index:i,content:v});}else it.textContent=box.items[i];});
    it.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();it.blur();}if(e.key==='Escape'){it.textContent=box.items[i];it.blur();}});
    row.querySelector('.idel').addEventListener('click',e=>{e.stopPropagation();box.items.splice(i,1);sync('deleteItem',{boxUuid:box.id,index:i});rebuildBox(box.id);toast('ลบหัวข้อย่อยแล้ว');});
  });
  const ai=el.querySelector('.addinput input'),ag=el.querySelector('.addinput .go');
  const doAdd=()=>{const v=ai.value.trim();if(!v)return;box.items.push(v);sync('addItem',{boxUuid:box.id,content:v});rebuildBox(box.id);toast('เพิ่มหัวข้อย่อยแล้ว');};
  ai.addEventListener('input',()=>{ag.disabled=!ai.value.trim();});
  ai.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();doAdd();}});
  ag.addEventListener('click',e=>{e.stopPropagation();doAdd();});
  return el;
};

const mkAS=p=>{
  const w=document.createElement('div');
  const btn=document.createElement('button');btn.className='as-btn';btn.type='button';btn.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>เพิ่ม Strategy`;
  const form=document.createElement('div');form.className='as-form';form.innerHTML=`<input type="text" placeholder="ชื่อ Strategy ใหม่..."/><button class="mini no" type="button">ยกเลิก</button><button class="mini go" type="button" disabled>เพิ่ม</button>`;
  w.appendChild(btn);w.appendChild(form);
  const inp=form.querySelector('input'),no=form.querySelector('.no'),go=form.querySelector('.go');
  const open=()=>{btn.style.display='none';form.classList.add('show');inp.value='';go.disabled=true;setTimeout(()=>inp.focus(),20);};
  const close=()=>{form.classList.remove('show');btn.style.display='';};
  const commit=()=>{const v=inp.value.trim();if(!v){close();return;}const nb={id:uid('b'),pid:p.id,t:v,items:[]};tab().boxes.push(nb);sync('addBox',{pillarUuid:p.id,boxUuid:nb.id,title:v});renderBoard();setTimeout(()=>{drawLines();openBox(nb.id);setTimeout(()=>{const el=document.getElementById('b'+nb.id);if(el)enterE(el);},350);},50);updateFoot();toast('เพิ่ม Strategy แล้ว');};
  btn.addEventListener('click',open);no.addEventListener('click',close);go.addEventListener('click',commit);
  inp.addEventListener('input',()=>{go.disabled=!inp.value.trim();});inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();commit();}if(e.key==='Escape')close();});
  return w;
};

const mkAddPillar=()=>{
  const stack=document.createElement('div');stack.className='ap-stack';
  const btn=document.createElement('button');btn.className='ap-btn';btn.type='button';btn.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg><span>เพิ่ม Pillar</span>`;
  const form=document.createElement('div');form.className='ap-form';form.innerHTML=`<input type="text" placeholder="ชื่อ Pillar ใหม่..."/><div class="row"><button class="mini no" type="button">ยกเลิก</button><button class="mini go" type="button" disabled>เพิ่ม</button></div>`;
  stack.appendChild(btn);stack.appendChild(form);
  const inp=form.querySelector('input'),no=form.querySelector('.no'),go=form.querySelector('.go');
  const open=()=>{btn.style.display='none';form.classList.add('show');inp.value='';go.disabled=true;setTimeout(()=>inp.focus(),20);};
  const close=()=>{form.classList.remove('show');btn.style.display='';};
  const commit=()=>{const v=inp.value.trim();if(!v){close();return;}const np={id:uid('p'),t:v};tab().pillars.push(np);sync('addPillar',{tabUuid:tab().id,pillarUuid:np.id,title:v});renderBoard();drawLines();updateFoot();setTimeout(()=>{const ns=document.querySelector(`.pstack[data-pid="${np.id}"]`);if(ns)ns.scrollIntoView({behavior:'smooth',inline:'end',block:'nearest'});},80);toast(`เพิ่ม Pillar "${v}" แล้ว`);};
  btn.addEventListener('click',open);no.addEventListener('click',close);go.addEventListener('click',commit);
  inp.addEventListener('input',()=>{go.disabled=!inp.value.trim();});inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();commit();}if(e.key==='Escape')close();});
  return stack;
};

const rebuildBox=id=>{
  const old=document.getElementById('b'+id);if(!old)return;
  const wasOpen=old.classList.contains('open'),wasE=old.classList.contains('em');
  const box=findBox(id);if(!box)return;
  const pi=pillarIdx(box.pid)+1;const sb=boxes().filter(b=>b.pid===box.pid);const di=sb.indexOf(box)+1;
  const fresh=mkBox(box,pi,di,di===1);old.replaceWith(fresh);
  if(wasOpen){fresh.classList.add('open');if(wasE)enterE(fresh);}drawLines();
};

let expandedId=null;
const openBox=id=>{
  if(expandedId===id)return;
  if(expandedId){const p=document.getElementById('b'+expandedId);if(p){if(p.classList.contains('em'))exitE(p);p.classList.remove('open');}}
  const el=document.getElementById('b'+id);if(!el)return;
  el.classList.add('open');expandedId=id;
  const pid=el.dataset.pid;
  document.querySelectorAll('.phead').forEach(h=>{h.classList.toggle('hi',h.dataset.pid===pid);h.classList.toggle('dim',h.dataset.pid!==pid);});
  document.querySelectorAll('.box').forEach(b=>b.classList.toggle('dim',b.dataset.id!==id));
  setTimeout(()=>drawLines(id),50);
  setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'}),300);
};
const closeAll=()=>{
  if(!expandedId)return;
  const el=document.getElementById('b'+expandedId);if(el){if(el.classList.contains('em'))exitE(el);el.classList.remove('open');}
  expandedId=null;
  document.querySelectorAll('.phead').forEach(h=>h.classList.remove('hi','dim'));
  document.querySelectorAll('.box').forEach(b=>b.classList.remove('dim'));
  drawLines(null);
};
const enterE=el=>{el.classList.add('em');el.querySelectorAll('.itext').forEach(t=>t.contentEditable='true');};
const exitE=el=>{el.classList.remove('em');el.querySelectorAll('.itext').forEach(t=>t.contentEditable='false');const i=el.querySelector('.addinput input');if(i)i.value='';};

const drawLines=(fid=expandedId)=>{
  const svg=document.getElementById('svg');const inn=document.getElementById('dInner');if(!svg||!inn)return;
  const ir=inn.getBoundingClientRect();if(!ir.width)return;
  const W=inn.scrollWidth||inn.clientWidth,H=inn.scrollHeight||inn.clientHeight;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.setAttribute('width',W);svg.setAttribute('height',H);
  const r=el=>{const rc=el.getBoundingClientRect();return{cx:(rc.left+rc.width/2-ir.left)/Z,top:(rc.top-ir.top)/Z,bot:(rc.bottom-ir.top)/Z};};
  const planEl=document.getElementById('planCard');if(!planEl)return;
  const plan=r(planEl);const pEls=Array.from(document.querySelectorAll('.phead'));const pR=pEls.map(r);
  if(!pR.length){svg.innerHTML='';return;}
  const minPT=Math.min(...pR.map(p=>p.top));const tY=plan.bot+(minPT-plan.bot)*.55;
  const fbox=fid?findBox(fid):null;const fpid=fbox?fbox.pid:null;const fpi=fpid?pillarIdx(fpid):-1;const fc=fpi>=0?pc(fpi).m:null;
  const p2=(d,cl,st)=>`<path d="${d}"${cl?` class="${cl}"`:''}${st?` style="stroke:${st}"`:''}/>`;
  let h='';
  h+=p2(`M ${plan.cx} ${plan.bot} L ${plan.cx} ${tY}`,fc?'hi':null,fc);
  h+=p2(`M ${pR[0].cx} ${tY} L ${pR[pR.length-1].cx} ${tY}`);
  if(fpid&&fpi>=0&&pR[fpi]){const fp=pR[fpi];const a=Math.min(plan.cx,fp.cx),b=Math.max(plan.cx,fp.cx);h+=p2(`M ${a} ${tY} L ${b} ${tY}`,'hi',fc);}
  pEls.forEach((pe,i)=>{const pid=pe.dataset.pid,pr=pR[i];h+=p2(`M ${pr.cx} ${tY} L ${pr.cx} ${pr.top}`,fpid===pid?'hi':null,fpid===pid?fc:null);});
  pEls.forEach((pe,i)=>{
    const pid=pe.dataset.pid,pr=pR[i];const cbs=document.querySelectorAll(`.pstack[data-pid="${pid}"] .box`);if(!cbs.length)return;
    const bR=Array.from(cbs).map(rb=>{const rc=rb.getBoundingClientRect();return{left:(rc.left-ir.left)/Z,right:(rc.right-ir.left)/Z,top:(rc.top-ir.top)/Z,bot:(rc.bottom-ir.top)/Z,cx:(rc.left+rc.width/2-ir.left)/Z};});
    const col=pc(i).m;const df=fpid===pid;
    const connX=bR[0].left+16/Z;
    const firstTop=Math.min(...bR.map(b=>b.top));
    const brY=pr.bot+(firstTop-pr.bot)*.45;
    h+=p2(`M ${connX} ${pr.bot} L ${connX} ${brY}`,df?'hi':null,df?col:null);
    bR.forEach((b,j)=>{const bid=cbs[j].dataset.id;const isF=fid===bid;const opt=isF?{cl:'hi',st:col}:{};
      h+=p2(`M ${connX} ${brY} L ${connX} ${b.top}`,opt.cl,opt.st);
    });
  });
  svg.innerHTML=h;svg.classList.toggle('foc',!!fid);
};
let dlT=null;
const sd=(fid)=>{clearTimeout(dlT);dlT=setTimeout(()=>drawLines(fid??expandedId),60);setTimeout(()=>drawLines(fid??expandedId),260);};

document.getElementById('btnExport').addEventListener('click',()=>{
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(S,null,2)],{type:'application/json'}));a.download=`plan14-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href);toast('ส่งออกข้อมูลแล้ว');
  clearTimeout(saveTimer);
  fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-TOKEN':CSRF},body:JSON.stringify(S)});
});
document.getElementById('btnImport').addEventListener('click',()=>document.getElementById('fileIn').click());
document.getElementById('fileIn').addEventListener('change',e=>{
  const f=e.target.files[0];if(!f)return;
  const rd=new FileReader();
  rd.onload=async ev=>{
    try{
      const d=JSON.parse(ev.target.result);if(!d||!Array.isArray(d.tabs))throw 0;
      S=d;if(!S.aid||!S.tabs.find(t=>t.id===S.aid))S.aid=S.tabs[0].id;
      S.tabs.forEach(t=>{if(!t.planT)t.planT='แผนพัฒนาเศรษฐกิจและสังคมแห่งชาติ ฉบับที่ 14';});
      await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-TOKEN':CSRF},body:JSON.stringify(S)});
      expandedId=null;renderTabs();renderBoard();drawLines();updateFoot();syncPlanT();toast('นำเข้าข้อมูลแล้ว');
    }catch{toast('ไฟล์ไม่ถูกต้อง');}
  };
  rd.readAsText(f);e.target.value='';
});
document.getElementById('btnReset').addEventListener('click',()=>{
  const ic=mkIC('คืนค่าทั้งหมดเป็นค่าเริ่มต้น? (ทุกแท็บและการแก้ไขจะหายไป)',async()=>{
    S=mkState();
    await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-TOKEN':CSRF},body:JSON.stringify(S)});
    expandedId=null;renderTabs();renderBoard();drawLines();updateFoot();syncPlanT();toast('คืนค่าเริ่มต้นแล้ว');
  });
  document.querySelector('.toolbar').appendChild(ic);
});
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&(e.key==='+'||e.key==='=')){e.preventDefault();zStep(1);}
  if((e.ctrlKey||e.metaKey)&&e.key==='-'){e.preventDefault();zStep(-1);}
  if((e.ctrlKey||e.metaKey)&&e.key==='0'){e.preventDefault();setZ(1);}
  if(e.key==='Escape'&&expandedId)closeAll();
});
document.getElementById('planCard').addEventListener('click',()=>{if(expandedId)closeAll();});
(async()=>{
  S=await load();renderTabs();renderBoard();updateFoot();
  window.addEventListener('load',()=>{drawLines();setTimeout(drawLines,100);setTimeout(drawLines,500);});
  window.addEventListener('resize',()=>{setZ(Z,false);sd();});
  if(window.ResizeObserver)new ResizeObserver(()=>sd()).observe(document.getElementById('dInner'));
})();

/* ── Online heartbeat ── */
const heartbeat=async()=>{
  try{const r=await fetch('/app/plan14/api/heartbeat');if(r.ok){const d=await r.json();document.getElementById('onlineCount').textContent=d.online;}}catch(e){}
};
heartbeat();setInterval(heartbeat,15000);
  </script>
</body>

</html>