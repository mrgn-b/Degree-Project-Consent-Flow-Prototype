export const model = {
  serviceProviders: [
    {
      id: "acme",
      name: "Acme Analytics",
      description: "Data analytics and insights provider",
      logoUrl: `${import.meta.env.BASE_URL}assets/logos/acme.svg`,
      status: "inactive",
      purposes: [
        {
          id: "analytics",
          description: "Usage analytics",
          dataCategories: ["usage_data", "device_info"],
          required: true,
          category: "required"
        },
        {
          id: "personalization",
          description: "Personalized recommendations",
          dataCategories: ["usage_data", "location"],
          required: false,
          category: "functional"
        },
        {
          id: "marketing",
          description: "Marketing insights",
          dataCategories: ["usage_data", "location", "device_info"],
          required: true,
          category: "required"
        },
        {
          id: "benchmarking",
          description: "Compare usage trends across anonymized user groups",
          dataCategories: ["usage_data"],
          required: false,
          category: "functional"
        },
        {
          id: "data_sharing_partners",
          description: "Share aggregated insights with business partners",
          dataCategories: ["usage_data"],
          required: false,
          category: "advertising"
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
      logoUrl: `${import.meta.env.BASE_URL}assets/logos/notifyco.svg`,
      status: "inactive",
      purposes: [
        {
          id: "messaging",
          description: "Send notifications",
          dataCategories: ["contact_info", "preferences"],
          required: true,
          category: "required"
        },
        {
          id: "alerts",
          description: "Critical alerts",
          dataCategories: ["contact_info", "location"],
          required: true,
          category: "required"
        },
        {
          id: "marketing",
          description: "Promotional messaging",
          dataCategories: ["contact_info", "preferences"],
          required: false,
          category: "advertising"
        },
        {
          id: "delivery_optimization",
          description: "Optimize notification delivery timing",
          dataCategories: ["usage_data", "device_info"],
          required: false,
          category: "functional"
        },
        {
          id: "engagement_tracking",
          description: "Track interaction with notifications",
          dataCategories: ["usage_data"],
          required: false,
          category: "advertising"
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
      logoUrl: `${import.meta.env.BASE_URL}assets/logos/hair.svg`,
      status: "inactive",
      purposes: [
        {
          id: "booking",
          description: "Appointment booking",
          dataCategories: ["contact_info", "location"],
          required: true,
          category: "required"
        },
        {
          id: "personalization",
          description: "Personalized recommendations",
          dataCategories: ["contact_info"],
          required: false,
          category: "functional"
        },
        {
          id: "loyalty",
          description: "Loyalty program",
          dataCategories: ["contact_info", "payment_info"],
          required: false,
          category: "advertising"
        },
        {
          id: "reminders",
          description: "Send appointment reminders",
          dataCategories: ["contact_info"],
          required: true,
          category: "required"
        },
        {
          id: "feedback_collection",
          description: "Collect feedback after your visit",
          dataCategories: ["contact_info", "service_history"],
          required: false,
          category: "functional"
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
      logoUrl: `${import.meta.env.BASE_URL}assets/logos/secureprofile.svg`,
      status: "inactive",
      purposes: [
        {
          id: "authentication",
          description: "User authentication",
          dataCategories: ["identity_info", "security_info"],
          required: true,
          category: "required"
        },
        {
          id: "profile_management",
          description: "Profile management",
          dataCategories: ["identity_info", "contact_info"],
          required: false,
          category: "functional"
        },
        {
          id: "security_alerts",
          description: "Security alerts",
          dataCategories: ["security_info", "contact_info"],
          required: true,
          category: "required"
        },
        {
          id: "multi_factor_auth",
          description: "Enable multi-factor authentication",
          dataCategories: ["security_info", "contact_info"],
          required: true,
          category: "required"
        },
        {
          id: "activity_logs",
          description: "Maintain logs of account activity",
          dataCategories: ["usage_data", "security_info"],
          required: false,
          category: "functional"
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
      logoUrl: `${import.meta.env.BASE_URL}assets/logos/plumber.svg`,
      status: "inactive",
      purposes: [
        {
          id: "booking",
          description: "Appointment scheduling",
          dataCategories: ["contact_info", "address_info"],
          required: true,
          category: "required"
        },
        {
          id: "emergency_services",
          description: "Emergency services",
          dataCategories: ["contact_info", "service_history"],
          required: false,
          category: "functional"
        },
        {
          id: "technician_assignment",
          description: "Assign the nearest available technician",
          dataCategories: ["address_info", "location"],
          required: true,
          category: "required"
        },
        {
          id: "service_followup",
          description: "Follow up after completed service",
          dataCategories: ["contact_info", "service_history"],
          required: false,
          category: "functional"
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
      logoUrl: `${import.meta.env.BASE_URL}assets/logos/cafe.svg`,
      status: "inactive",
      purposes: [
        {
          id: "ordering",
          description: "Order processing",
          dataCategories: ["contact_info", "payment_info", "order_history"],
          required: true,
          category: "required"
        },
        {
          id: "delivery_tracking",
          description: "Track deliveries",
          dataCategories: ["contact_info", "location", "order_history"],
          required: true,
          category: "required"
        },
        {
          id: "marketing",
          description: "Promotions & offers",
          dataCategories: ["contact_info", "preferences"],
          required: false,
          category: "advertising"
        },
        {
          id: "order_recommendations",
          description: "Suggest items based on past orders",
          dataCategories: ["order_history"],
          required: false,
          category: "functional"
        },
        {
          id: "loyalty_tracking",
          description: "Track points and rewards in loyalty program",
          dataCategories: ["order_history", "contact_info"],
          required: false,
          category: "advertising"
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
          required: true,
          category: "required"
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
          required: true,
          category: "required"
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
          required: true,
          category: "required"
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
          required: true,
          category: "required"
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
          required: true,
          category: "required"
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
          required: true,
          category: "required"
        }
      ],
      thirdParties: [
        { id: "uber", name: "Uber" },
        { id: "google_maps", name: "Google Maps API" }
      ]
    },

    {
      id: "gaming_rewards",
      name: "Play & Earn",
      description: "Share your gaming activity to earn instant in-game rewards",
      logoUrl: "/assets/logos/gaming.svg",
      status: "available",
      reward: "500 in-game credits",
      duration: {
        value: 0,
        unit: "instant"
      },
      purposes: [
        {
          id: "gaming_activity_tracking",
          description: "Track and analyze your gaming activity",
          dataCategories: ["gameplay_data", "device_info"],
          required: true,
          category: "required"
        }
      ],
      thirdParties: [
        { id: "steam", name: "Steam" },
        { id: "epic_games", name: "Epic Games" }
      ]
    },

    {
      id: "ipet_rewards",
      name: "PetTracker",
      description: "Share your pet's activity and health data for instant rewards",
      logoUrl: "/assets/logos/pet.svg",
      status: "available",
      reward: "10% off pet supplies",
      duration: {
        value: 0,
        unit: "instant"
      },
      purposes: [
        {
          id: "pet_activity_tracking",
          description: "Track pet's activity and health metrics",
          dataCategories: ["health_data", "activity_data"],
          required: true,
          category: "required"
        }
      ],
      thirdParties: [
        { id: "fitbark", name: "FitBark" },
        { id: "whistle", name: "Whistle" }
      ]
    },
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