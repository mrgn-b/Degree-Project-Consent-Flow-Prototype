# User-centered Consent Flow Prototype

## Design and Prototyping of a User-centered Consent Flow

This repository contains the source code for the web application prototype developed as part of a Bachelor's thesis at KTH Royal Institute of Technology in collaboration with Fixmeapp AB.

---

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Future Work](#future-work)
- [Thesis Information](#thesis-information)
- [Acknowledgments](#acknowledgments)
- [Citation](#citation)

---

## About The Project

This project is a web application prototype designed to investigate and address the lack of user-centered consent mechanisms in existing digital service platforms. The prototype serves as a potential solution and example of how the processing and management of consent can be enhanced within these platforms.

The system is designed to improve transparency and user control through a structured consent management flow. Rather than treating consent as a one-time action, the application supports consent throughout its lifecycle, including granting, reviewing, modifying, and withdrawing consent.

Users can access services or data-sharing offers that require consent for specific data purposes. Before sharing data, users are presented with a detailed consent request explaining what data is collected, why it is needed, who may receive it, and for how long it will be used. Granular controls allow users to manage consent at purpose level.

The application also includes a **Consent Dashboard** for managing active consent and a **Consent History** view for reviewing past consent decisions. Together, these features aim to promote informed decision-making, transparency, and ongoing user autonomy while reducing consent fatigue through a structured and scalable interface design.

---

## Key Features

### Consent Lifecycle Management
- Supports granting, reviewing, modifying, and withdrawing consent
- Tracks consent across its full lifecycle
- Maintains a record of consent changes for transparency

### Granular Consent Control
- Users can inspect data requests by purpose and category
- Provides fine-grained options for granting or rejecting consent
- Clear presentation of what data is collected, why, and for how long

### Consent Dashboard
- Centralized view of all active consents
- Enables modification or revocation of consent at any time
- Supports easy monitoring of ongoing data sharing

### Consent History
- Detailed record of all past consent decisions
- Tracks granted, revoked, expired, or modified consents
- Improves transparency and accountability

### Contextualized Data Requests
- Consent requests presented within the context of service use or data offers
- Encourages informed decision-making by linking consent to user actions
- Reduces consent fatigue through layered and progressive interfaces

---

## Tech Stack

### Frontend Development
- JavaScript
- React
- Tailwind CSS

### State Management
- Zustand
- Zustand Persistence

### Design
- Tailwind UI components

### Deployment
- GitHub Pages

---

## Future Work

Potential future developments include:

- Conducting larger-scale and longitudinal user studies to evaluate the prototype's impact on user comprehension, consent fatigue, and long-term engagement.
- Exploring adaptive and personalized consent interfaces that balance transparency, usability, and user control.
- Improving scalability by investigating data minimization strategies and reducing the complexity of consent decisions presented to users.
- Integrating the consent flow into real-world digital service ecosystems and evaluating its interaction with existing platforms and third-party services.
- Extending the consent architecture beyond the interface layer to ensure consent decisions are enforced throughout data collection, storage, retention, and deletion processes.

---

## Thesis Information

This project was submitted in fulfillment of the requirements for the Degree Programme in Information and Communication Technology at KTH Royal Institute of Technology.

| Field | Information |
|---------|------------|
| **Title** | Design and Prototyping of a User-centered Consent Flow |
| **Swedish Title** | Design och prototypframtagning av ett användarcentrerat samtyckesflöde |
| **Institution** | KTH Royal Institute of Technology (Kungliga Tekniska högskolan) |
| **Host Company** | Fixmeapp AB |
| **School** | School of Electrical Engineering and Computer Science |
| **Date** | June 4, 2026 |
| **Supervisors** | Fredrik Lundevall & Johanna Viio Löfgren |
| **Examiner** | Robert Rönngren |

---

## Acknowledgments

Special thanks to the people that made this project possible:

- Robert Rönngren, Examinator
- Fredrik Lundevall, Academic Supervisor
- Johanna Viio Löfgren, Company Representative

---

### Citation

If you use or reference this project in academic work, please cite the associated Bachelor's thesis.
