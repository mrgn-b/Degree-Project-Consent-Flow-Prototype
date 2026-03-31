export const model = {
  serviceProviders: [
    {
      id: "acme",
      name: "Acme Analytics",
      description: "Data analytics and insights provider",
      logoUrl: "/assets/logos/acme.svg",
      status: "inactive",
      purposes: [
        { id: "analytics", description: "Usage analytics" },
        { id: "personalization", description: "Personalized recommendations" },
        { id: "marketing", description: "Marketing insights" }
      ],
      dataCategories: [
        { type: "usage_data" },
        { type: "location" },
        { type: "device_info" }
      ],
      thirdParties: [
        { id: "google_analytics", name: "Google Analytics" },
        { id: "mixpanel", name: "Mixpanel" }
      ]
    },
    {
      id: "notifyco",
      name: "NotifyCo",
      description: "Push notification and messaging service",
      logoUrl: "/assets/logos/notifyco.svg",
      status: "inactive",
      purposes: [
        { id: "messaging", description: "Send notifications" },
        { id: "alerts", description: "Critical alerts" },
        { id: "marketing", description: "Promotional messaging" }
      ],
      dataCategories: [
        { type: "contact_info" },
        { type: "preferences" },
        { type: "location" }
      ],
      thirdParties: [
        { id: "onesignal", name: "OneSignal" },
        { id: "firebase", name: "Firebase Cloud Messaging" }
      ]
    },
    {
      id: "hair",
      name: "Hair Salon Luxe",
      description: "Premium hairdressing services",
      logoUrl: "/assets/logos/hair.svg",
      status: "inactive",
      purposes: [
        { id: "booking", description: "Appointment booking" },
        { id: "personalization", description: "Personalized recommendations" },
        { id: "loyalty", description: "Loyalty program" }
      ],
      dataCategories: [
        { type: "contact_info" },
        { type: "location" },
        { type: "payment_info" }
      ],
      thirdParties: [
        { id: "square", name: "Square Payments" },
        { id: "mailchimp", name: "Mailchimp" }
      ]
    },
    {
      id: "secureprofile",
      name: "SecureProfile",
      description: "User identity and profile management",
      logoUrl: "/assets/logos/secureprofile.svg",
      status: "inactive",
      purposes: [
        { id: "authentication", description: "User authentication" },
        { id: "profile_management", description: "Profile management" },
        { id: "security_alerts", description: "Security alerts" }
      ],
      dataCategories: [
        { type: "identity_info" },
        { type: "contact_info" },
        { type: "security_info" }
      ],
      thirdParties: [
        { id: "auth0", name: "Auth0" },
        { id: "okta", name: "Okta" }
      ]
    },
    {
      id: "plumb",
      name: "PlumbRight",
      description: "Certified plumbing services",
      logoUrl: "/assets/logos/plumber.svg",
      status: "inactive",
      purposes: [
        { id: "booking", description: "Appointment scheduling" },
        { id: "emergency_services", description: "Emergency services" }
      ],
      dataCategories: [
        { type: "contact_info" },
        { type: "address_info" },
        { type: "service_history" }
      ],
      thirdParties: [
        { id: "stripe", name: "Stripe Payments" },
        { id: "twilio", name: "Twilio SMS" }
      ]
    },
    {
      id: "cafe",
      name: "Cafe Delight",
      description: "Coffee and snack delivery service",
      logoUrl: "/assets/logos/cafe.svg",
      status: "inactive",
      purposes: [
        { id: "ordering", description: "Order processing" },
        { id: "delivery_tracking", description: "Track deliveries" },
        { id: "marketing", description: "Promotions & offers" }
      ],
      dataCategories: [
        { type: "contact_info" },
        { type: "payment_info" },
        { type: "order_history" },
        { type: "location" }
      ],
      thirdParties: [
        { id: "stripe", name: "Stripe Payments" },
        { id: "google_maps", name: "Google Maps API" }
      ]
    }
  ],

  consents: [],

  /* How consent objects should look like
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
*/

};