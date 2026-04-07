export const model = {
  serviceProviders: [
    {
      id: "acme",
      name: "Acme Analytics",
      description: "Data analytics and insights provider",
      logoUrl: "/assets/logos/acme.svg",
      status: "inactive",
      purposes: [
        {
          id: "analytics",
          description: "Usage analytics",
          dataCategories: ["usage_data", "device_info"],
          required: true
        },
        {
          id: "personalization",
          description: "Personalized recommendations",
          dataCategories: ["usage_data", "location"],
          required: false
        },
        {
          id: "marketing",
          description: "Marketing insights",
          dataCategories: ["usage_data", "location", "device_info"],
          required: true
        }
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
        {
          id: "messaging",
          description: "Send notifications",
          dataCategories: ["contact_info", "preferences"],
          required: true 
        },
        { 
          id: "alerts", 
          description: "Critical alerts", 
          dataCategories: ["contact_info", "location"],
          required: true 
        },
        { 
          id: "marketing", 
          description: "Promotional messaging", 
          dataCategories: ["contact_info", "preferences"],
          required: false 
        }
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
        { 
          id: "booking", 
          description: "Appointment booking", 
          dataCategories: ["contact_info", "location"],
          required: true
         },
        { 
          id: "personalization", 
          description: "Personalized recommendations", 
          dataCategories: ["contact_info"], 
          required: false
        },
        { id: "loyalty", 
          description: "Loyalty program", 
          dataCategories: ["contact_info", "payment_info"],
          required: false
        }
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
        { 
          id: "authentication",
          description: "User authentication",
          dataCategories: ["identity_info", "security_info"],
          required: true
          },
        { 
          id: "profile_management", 
          description: "Profile management", 
          dataCategories: ["identity_info", "contact_info"],
          required: false
        },
        { 
          id: "security_alerts", 
          description: "Security alerts", 
          dataCategories: ["security_info", "contact_info"],
          required: true
        }
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
        { 
          id: "booking",
          description: "Appointment scheduling", 
          dataCategories: ["contact_info", "address_info"],
          required: true
        },
        { 
          id: "emergency_services", 
          description: "Emergency services", 
          dataCategories: ["contact_info", "service_history"], 
          required: false
        }
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
        { 
          id: "ordering", 
          description: "Order processing", 
          dataCategories: ["contact_info", "payment_info", "order_history"], 
          required: true
        },
        { id: "delivery_tracking", 
          description: "Track deliveries", 
          dataCategories: ["contact_info", "location", "order_history"],
          required: true
        },
        { 
          id: "marketing", 
          description: "Promotions & offers", 
          dataCategories: ["contact_info", "preferences"],
          required: false
        }
      ],
      thirdParties: [
        { id: "stripe", name: "Stripe Payments" },
        { id: "google_maps", name: "Google Maps API" }
      ]
    }
  ],
  consents: [],
  consentActions: [],
  
  dataRequests: [
    {
      id: "fitness_rewards",
      name: "FitTrack Rewards",
      description: "Share fitness data to earn wellness points",
      logoUrl: "/assets/logos/fitness.svg",
      status: "available",
      reward: "500 wellness points",
      duration: {
        value: 2,
        unit: "months"
      },
      purposes: [
        {
          id: "activity_tracking",
          description: "Analyze physical activity",
          dataCategories: ["health_data", "device_info"],
          required: true
        },
      ],
      thirdParties: [
        { id: "fitbit", name: "Fitbit" },
        { id: "apple_health", name: "Apple HealthKit" }
      ]
    },

    {
      id: "retail_discounts",
      name: "ShopSmart Insights",
      description: "Share purchase behavior for exclusive discounts",
      logoUrl: "/assets/logos/shop.svg",
      status: "available",
      reward: "10% discount coupon",
      duration: {
        value: 14,
        unit: "days"
      },
      purposes: [
        {
          id: "purchase_analysis",
          description: "Analyze purchase history",
          dataCategories: ["transaction_data", "product_usage"],
          required: true
        },
      ],
      thirdParties: [
        { id: "stripe", name: "Stripe" },
        { id: "segment", name: "Segment" }
      ]
    },

    {
      id: "location_rewards",
      name: "CityPerks",
      description: "Share location data for local offers",
      logoUrl: "/assets/logos/location.svg",
      status: "available",
      reward: "Free coffee voucher",
      duration: {
        value: 7,
        unit: "days"
      },
      purposes: [
        {
          id: "location_tracking",
          description: "Track location for nearby deals",
          dataCategories: ["location"],
          required: true
        }
      ],
      thirdParties: [
        { id: "google_maps", name: "Google Maps API" }
      ]
    },

    {
      id: "media_feedback",
      name: "StreamInsights",
      description: "Share viewing habits for premium access",
      logoUrl: "/assets/logos/media.svg",
      status: "available",
      reward: "1 month premium subscription",
      duration: {
        value: 4,
        unit: "hours"
      },
      purposes: [
        {
          id: "content_analysis",
          description: "Analyze viewing behavior",
          dataCategories: ["usage_data", "preferences"],
          required: true
        },
      ],
      thirdParties: [
        { id: "netflix_analytics", name: "Netflix Analytics" }
      ]
    },

    {
      id: "survey_rewards",
      name: "OpinionHub",
      description: "Answer surveys and share opinions for gift cards",
      logoUrl: "/assets/logos/survey.svg",
      status: "available",
      reward: "$5 gift card",
      duration: {
        value: 2,
        unit: "minutes"
      },
      purposes: [
        {
          id: "survey_analysis",
          description: "Analyze survey responses",
          dataCategories: ["preferences", "demographics"],
          required: true
        }
      ],
      thirdParties: [
        { id: "qualtrics", name: "Qualtrics" }
      ]
    },

    {
      id: "transport_rewards",
      name: "MoveSmart",
      description: "Share mobility data for travel rewards",
      logoUrl: "/assets/logos/transport.svg",
      status: "available",
      reward: "Free transit pass (1 day)",
      duration: {
        value: 3,
        unit: "days"
      },
      purposes: [
        {
          id: "mobility_tracking",
          description: "Analyze commuting patterns",
          dataCategories: ["location", "usage_data"],
          required: true
        }
      ],
      thirdParties: [
        { id: "uber", name: "Uber" },
        { id: "google_maps", name: "Google Maps API" }
      ]
    }
  ]

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