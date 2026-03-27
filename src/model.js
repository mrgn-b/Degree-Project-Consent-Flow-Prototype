export const model = {
    serviceProviders: [
    { id: "acme", name: "Acme Analytics", description: "Data analytics and insights provider", logoUrl: "/assets/logos/acme.svg", status: "inactive" },
    { id: "notifyco", name: "NotifyCo", description: "Push notification and messaging service", logoUrl: "/assets/logos/notifyco.svg", status: "inactive" },
    { id: "hair", name: "Hair Salon Luxe", description: "Premium hairdressing services", logoUrl: "/assets/logos/hair.svg", status: "inactive" },
    { id: "secureprofile", name: "SecureProfile", description: "User identity and profile management", logoUrl: "/assets/logos/secureprofile.svg", status: "inactive" },
    { id: "plumb", name: "PlumbRight", description: "Certified plumbing services", logoUrl: "/assets/logos/plumber.svg", status: "inactive" },
    { id: "cafe", name: "Cafe Delight", description: "Coffee and snack delivery service", logoUrl: "/assets/logos/cafe.svg", status: "inactive" },
  ],

  consents: [
  {
    id: 1,

    serviceId: "acme",

    purposes: [
      {
        id: "analytics",
        description: "Usage analytics",
        granted: true,
      },
      {
        id: "personalization",
        description: "Personalized recommendations",
        granted: false,
      },
    ],

    dataCategories: [
      { type: "usage_data", granted: true },
      { type: "location", granted: false },
    ],

    thirdParties: [
      {
        id: "google_analytics",
        name: "Google Analytics",
        granted: true,
      },
    ],

    status: "active",

    timestamps: {
      createdAt: "2026-03-20T10:00:00Z",
      updatedAt: "2026-03-20T10:05:00Z",
      expiresAt: "2027-03-20T00:00:00Z",
      revokedAt: null,
    },

    metadata: {
      version: "1.0",
      consentMethod: "explicit",
    },
  },

  {
    id: 2,

    serviceId: "hair",

    purposes: [
      {
        id: "booking",
        description: "Appointment booking",
        granted: true,
      },
    ],

    dataCategories: [
      { type: "contact_info", granted: true },
    ],

    thirdParties: [],

    status: "revoked",

    timestamps: {
      createdAt: "2025-12-01T09:00:00Z",
      updatedAt: "2025-12-10T10:00:00Z",
      expiresAt: "2026-12-01T00:00:00Z",
      revokedAt: "2025-12-10T10:00:00Z",
    },

    metadata: {
      version: "1.0",
      consentMethod: "explicit",
    },
  },
],

};