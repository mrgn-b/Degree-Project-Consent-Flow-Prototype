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
      service: "Acme Analytics",
      status: "active",
      updatedAt: "2026-03-20",
      expiresAt: "2027-03-20",
    },
    {
      id: 2,
      service: "Hair Salon Luxe",
      status: "inactive",
      updatedAt: "2025-12-01",
      expiresAt: "2026-12-01",
    },
  ]

};