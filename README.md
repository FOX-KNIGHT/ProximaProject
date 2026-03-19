# 🌌 Proxima: Intelligent Occupancy & Grid Monitoring

A futuristic, microservices-based dashboard and AI inference engine designed for real-time spatial occupancy detection, grid telemetry, and system integrity monitoring. Proxima combines a hyper-modern React interface with a high-performance Python/YOLOv8 vision backend.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![YOLOv8](https://img.shields.io/badge/AI-YOLOv8-FF9900?style=for-the-badge)](https://ultralytics.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)]()

## ✨ Key Features

- 🤖 **AI Vision Engine**: Dedicated Python microservice running **YOLOv8** for high-speed, real-time spatial occupancy and object detection (`ai_occupancy_api`).
- ⚡ **Telemetry & Grid Backend**: A robust Node.js/Express backend serving live endpoints for System Status, Grid Metrics, and System Integrity.
- 🎨 **Quantum UI/UX**: A hyper-modern React dashboard featuring dynamic elements like the `SmartIsland` indicator, interactive `Sidebar`, and a reactive `QuantumBackground`.
- 🐳 **Microservice Architecture**: Fully decoupled architecture allowing independent scaling of the AI inference engine, backend data server, and frontend client.

## 🏗️ System Architecture

Proxima utilizes a three-tier microservice architecture to separate heavy AI inference from UI rendering:

```mermaid
graph TD
    A[Camera / Sensor Feed] -->|Image Frames| B(Python AI API - YOLOv8)
    B -- Occupancy JSON --> C{Node.js Express Backend}
    D[Grid / Hardware Sensors] -->|Metrics| C
    C -- REST API / Sockets --> E[React Frontend Dashboard]
    E --> F[Smart Island UI]
    E --> G[Integrity & Grid Widgets]
