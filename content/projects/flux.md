---
title: "Flux"
date: 2025-08-01
tags: ["rust", "glassflow", "clickhouse"]
summary: "An open source, declarative digital twin engine for electrochemical processes, written in Rust."
repository: https://github.com/pabloagn/flux
docs: https://github.com/pabloagn/flux/tree/main/docs
abbreviation: "F"
serial: 8
tools: ["rust", "python", "glassflow", "clickhouse", "docker", "nix"]
status: "In Progress"
catchphrase: "A digital twin engine for electrochemical processes, written in Rust"
draft: false
---

Flux is an open-source digital twin engine for chlor-alkali electrolysis plants. It models multi-electrolyzer operations, simulating the production of chlorine, hydrogen, and sodium hydroxide while tracking energy use, membrane health, and process efficiency.

The system ingests high-frequency sensor data into a real-time analytics pipeline powered by GlassFlow and ClickHouse. Predictive models forecast membrane degradation, correlate brine quality with performance, and optimize current distribution to reduce downtime and costs.

Built with Rust and Python, Flux combines process simulation, streaming data pipelines, and real-time, ultra-low latency analytics to deliver live KPIs, anomaly detection, and decision support for industrial electrochemical operations.

