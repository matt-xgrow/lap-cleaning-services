const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : "http://localhost:3000");

export const business = {
  name: "LAP Cleaning Services",
  clientId: "lap-cleaning-services-gold-coast",
  description:
    "LAP Services provides practical residential and commercial cleaning across the Gold Coast, Queensland.",
  city: "Gold Coast",
  state: "Queensland",
  country: "Australia",
  phone: process.env.NEXT_PUBLIC_LAP_PHONE ?? "",
  phoneDisplay: process.env.NEXT_PUBLIC_LAP_PHONE_DISPLAY ?? "",
  email: process.env.NEXT_PUBLIC_LAP_EMAIL ?? "",
  instagram: process.env.NEXT_PUBLIC_LAP_INSTAGRAM ?? "",
  facebook: process.env.NEXT_PUBLIC_LAP_FACEBOOK ?? "",
  googleReviews: process.env.NEXT_PUBLIC_LAP_GOOGLE_REVIEWS ?? "https://share.google/gba7XCcpeRyUIgQCX",
  hours: process.env.NEXT_PUBLIC_LAP_HOURS ?? "",
} as const;

export type Service = {
  slug: string;
  baseSlug: string;
  name: string;
  shortName: string;
  singular: string;
  eyebrow: string;
  outcome: string;
  summary: string;
  whoItsFor: string;
  painPoints: string[];
  scope: string[];
  quoteFactors: string[];
  approach: string[];
  faq: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "home-cleaning-gold-coast",
    baseSlug: "home-cleaning",
    name: "Home Cleaning Gold Coast",
    shortName: "Home cleaning",
    singular: "home clean",
    eyebrow: "A calmer home starts with less on your list",
    outcome: "Come home to a cleaner space — without losing your free time",
    summary:
      "LAP Cleaning Services provides home cleaning across the Gold Coast for households that want practical help keeping kitchens, bathrooms, bedrooms and living areas feeling cared for.",
    whoItsFor:
      "Home cleaning suits busy households, professionals, parents, downsizers and anyone who would rather spend their time living in their home than catching up on cleaning. Your quote is shaped around the property and the areas you want prioritised.",
    painPoints: [
      "The cleaning list keeps returning before you have caught up.",
      "Bathrooms and kitchens take the time you wanted for your weekend.",
      "Dust, floors and high-use areas make the whole home feel unfinished.",
      "You need a clear scope before deciding what help is right for you.",
    ],
    scope: [
      "Kitchens and food-preparation surfaces",
      "Bathrooms and high-use wet areas",
      "Bedrooms, living rooms and shared spaces",
      "Floors, accessible surfaces and general presentation",
      "Priorities confirmed for your individual home",
    ],
    quoteFactors: ["Property size and layout", "Current condition and priority areas", "One-off or ongoing cleaning needs", "Access, parking and preferred timing"],
    approach: ["Tell LAP what matters most in your home.", "Share your Gold Coast suburb and contact details.", "LAP follows up to clarify the scope and quote."],
    faq: [
      { question: "What is included in home cleaning on the Gold Coast?", answer: "A home cleaning quote can cover kitchens, bathrooms, bedrooms, living areas, floors and accessible surfaces. The final scope depends on your property, its condition and the priorities you share with LAP Cleaning Services before work is arranged." },
      { question: "Can I request a one-off home clean?", answer: "Yes. Use the quote survey to describe the service you need and select your timing. LAP can then confirm whether a one-off clean is available for your Gold Coast suburb and discuss the areas you want prioritised." },
      { question: "Do you provide regular house cleaning?", answer: "You can request ongoing home cleaning through the same quote process. Frequency is not assumed on the website; LAP will confirm suitable options after learning about your home, suburb and preferred schedule." },
      { question: "How much does home cleaning cost on the Gold Coast?", answer: "Home cleaning pricing depends on property size, condition, access, priorities and whether the service is one-off or ongoing. LAP provides a tailored quote after reviewing the details you submit, so you are not given a generic price that may not fit your home." },
      { question: "Which Gold Coast suburbs can request home cleaning?", answer: "LAP Cleaning Services serves the Gold Coast, Queensland. The site includes pages for major suburbs, and you can enter any Gold Coast suburb in the quote survey so the team can confirm availability for your address." },
      { question: "Do I need payment details to request a quote?", answer: "No. The online quote survey asks for the service, suburb, timing, name and phone number. Email is optional, and no payment details are collected when you request a quote." },
    ],
  },
  {
    slug: "office-cleaning-gold-coast",
    baseSlug: "office-cleaning",
    name: "Office Cleaning Gold Coast",
    shortName: "Office cleaning",
    singular: "office clean",
    eyebrow: "A workplace that feels ready for the day",
    outcome: "Keep your Gold Coast office clean, presentable and easier to manage",
    summary: "LAP Cleaning Services provides office cleaning enquiries across the Gold Coast for workplaces that need a clear cleaning scope around desks, amenities, shared areas and client-facing spaces.",
    whoItsFor: "Office cleaning is designed for local teams, professional suites, studios and small-to-medium workplaces. The quote process starts with the site, access and the areas that matter most to staff and visitors.",
    painPoints: ["Shared kitchens and amenities need steady attention.", "Client-facing areas shape the first impression of your business.", "Cleaning tasks distract staff from the work they are there to do.", "Access and timing need to fit around normal operations."],
    scope: ["Reception and client-facing areas", "Workstations and accessible office surfaces", "Shared kitchens, break rooms and amenities", "Floors, internal glass and common touchpoints", "A site-specific scope discussed before booking"],
    quoteFactors: ["Floor area and number of work zones", "Amenities, kitchens and shared facilities", "Site access and preferred service window", "Cleaning frequency and presentation standard"],
    approach: ["Describe the office and the result you need.", "Confirm the Gold Coast location and ideal timing.", "LAP reviews the site needs and prepares a quote."],
    faq: [
      { question: "What areas can office cleaning include?", answer: "Office cleaning can include reception, work areas, accessible desks and surfaces, shared kitchens, amenities, floors and common touchpoints. LAP confirms a site-specific scope so the quote reflects how your workplace is actually used." },
      { question: "Can cleaning be arranged around office hours?", answer: "Share your preferred timing in the quote survey. LAP will discuss access and availability before any service is arranged. The website does not promise a fixed schedule until the workplace requirements have been reviewed." },
      { question: "Do you clean small offices on the Gold Coast?", answer: "Small offices can request a quote. Property size, amenities, access and cleaning priorities are considered together, which helps LAP understand whether the service is suitable and what scope should be discussed." },
      { question: "How is an office cleaning quote calculated?", answer: "The quote is shaped by floor area, work zones, bathrooms, kitchens, access, preferred timing and service frequency. Providing accurate details helps LAP prepare a more relevant response for your Gold Coast workplace." },
      { question: "Is office cleaning different from corporate cleaning?", answer: "Office cleaning focuses on the day-to-day needs of an individual workplace. Corporate cleaning can involve larger sites, multiple stakeholder requirements or more formal scopes. LAP offers separate quote paths so the enquiry starts in the right place." },
      { question: "Which Gold Coast business areas do you cover?", answer: "LAP Cleaning Services serves the Gold Coast, Queensland. Major business areas on the site include Southport, Robina, Broadbeach, Varsity Lakes and surrounding Gold Coast suburbs, subject to confirmed availability." },
    ],
  },
  {
    slug: "bond-cleaning-gold-coast",
    baseSlug: "bond-cleaning",
    name: "Bond Cleaning Gold Coast",
    shortName: "Bond cleaning",
    singular: "bond clean",
    eyebrow: "Move out with one less job on the list",
    outcome: "Prepare your Gold Coast rental for handover with a clearer cleaning plan",
    summary: "LAP Cleaning Services accepts bond cleaning enquiries across the Gold Coast for tenants and property contacts preparing a rental home or apartment for handover.",
    whoItsFor: "Bond cleaning is for people leaving a rental property and needing a detailed clean planned around the layout, current condition, access and handover timing. Requirements vary by property and agreement, so the quote is tailored rather than assumed.",
    painPoints: ["Packing and moving already take most of your time.", "Empty rooms reveal marks and dust that were easy to miss.", "Apartments can have lift, parking and key-access constraints.", "The property needs a clear, agreed scope before handover."],
    scope: ["Kitchen surfaces, cupboards and accessible fittings", "Bathrooms, bedrooms and living areas", "Floors, skirting areas and general presentation", "Internal areas discussed from the property details", "Scope confirmed against the information you provide"],
    quoteFactors: ["Property type, size and condition", "Furnished or unfurnished presentation", "Access, lifts, keys and parking", "Handover timing and requested scope"],
    approach: ["Select bond cleaning and your timing.", "Share the suburb and your contact details.", "LAP follows up to clarify the property and quote."],
    faq: [
      { question: "What is bond cleaning?", answer: "Bond cleaning is a detailed clean carried out when a tenant is preparing to hand a rental property back. The exact scope depends on the property, its condition and the tenancy requirements, so LAP confirms details before quoting." },
      { question: "Does bond cleaning guarantee my bond return?", answer: "No cleaning company can control every decision made under a tenancy agreement. LAP does not publish an unverified bond-return guarantee. The service scope is discussed from the property information you provide so expectations can be clear before booking." },
      { question: "When should I request a bond cleaning quote?", answer: "Request a quote once you know the property address, expected handover date and when the home will be ready for cleaning. Earlier enquiries give LAP more context to discuss timing, but availability must still be confirmed." },
      { question: "Can you quote an apartment bond clean?", answer: "Yes, Gold Coast apartment tenants can request a quote. Include the suburb and mention access details such as lifts, parking, keys or building rules when LAP follows up, because these can affect the service plan." },
      { question: "How much does a bond clean cost on the Gold Coast?", answer: "Pricing varies with the property type, number of rooms, current condition, access and requested scope. LAP uses your enquiry details to prepare a tailored quote rather than publishing a price that may not match the rental." },
      { question: "Do I need to be at the property?", answer: "Access arrangements are confirmed directly before any work is booked. The online survey collects the first details; LAP can then discuss keys, building access and whether someone needs to be present." },
    ],
  },
  {
    slug: "corporate-cleaning-gold-coast",
    baseSlug: "corporate-cleaning",
    name: "Corporate Cleaning Gold Coast",
    shortName: "Corporate cleaning",
    singular: "corporate clean",
    eyebrow: "A professional cleaning scope for professional spaces",
    outcome: "Keep corporate spaces across the Gold Coast ready for people and business",
    summary: "LAP Cleaning Services accepts corporate cleaning enquiries for Gold Coast workplaces that need cleaning planned around site presentation, shared facilities, access and stakeholder expectations.",
    whoItsFor: "Corporate cleaning suits larger or more structured workplace environments where the cleaning scope may involve several zones, formal access arrangements or multiple decision-makers. Each enquiry is reviewed against the actual site needs.",
    painPoints: ["Different work zones have different presentation needs.", "Amenities and common areas affect the whole team.", "Access arrangements must be clear and controlled.", "Decision-makers need a scope that is easy to review."],
    scope: ["Reception, meeting and client-facing zones", "Shared work areas and accessible surfaces", "Amenities, kitchens and staff common areas", "Floors, touchpoints and presentation details", "A documented scope discussed for the individual site"],
    quoteFactors: ["Number and type of workplace zones", "Building access and service windows", "Amenities, common areas and floor area", "Frequency, priorities and stakeholder requirements"],
    approach: ["Outline the site and business requirements.", "Confirm the Gold Coast location and contact person.", "LAP discusses scope, availability and quotation."],
    faq: [
      { question: "What is corporate cleaning?", answer: "Corporate cleaning is workplace cleaning planned around a business site, its shared facilities, presentation standards and access requirements. It often needs a more structured scope than a simple office enquiry, although the exact service depends on the property." },
      { question: "Can corporate cleaning cover common areas?", answer: "Common areas can be discussed as part of the quote, including reception, meeting spaces, staff kitchens, amenities and circulation areas. LAP confirms what is in scope before a service is arranged." },
      { question: "Do you provide corporate cleaning across the Gold Coast?", answer: "LAP Cleaning Services serves businesses on the Gold Coast, Queensland. Enter the site suburb in the quote survey so availability and site requirements can be checked for that specific location." },
      { question: "Can the scope be tailored to our workplace?", answer: "Yes. The quote process starts with your site rather than a fixed generic checklist. Share the important work zones, access needs and timing so LAP can discuss a scope relevant to the workplace." },
      { question: "How do we request a corporate cleaning quote?", answer: "Select corporate cleaning, enter the Gold Coast suburb, choose the timing and provide a contact name and phone number. LAP can then follow up to clarify the workplace and what should be included." },
      { question: "Is corporate cleaning available for multiple sites?", answer: "Use the quote form for the first location and mention the additional sites when LAP contacts you. Multi-site availability and scope need to be confirmed directly and are not assumed by the website." },
    ],
  },
  {
    slug: "airbnb-cleaning-gold-coast",
    baseSlug: "airbnb-cleaning",
    name: "Airbnb Cleaning Gold Coast",
    shortName: "Airbnb cleaning",
    singular: "Airbnb clean",
    eyebrow: "Help your short-stay property feel ready for the next guest",
    outcome: "Prepare Gold Coast short-stay spaces for a cleaner guest arrival",
    summary: "LAP Cleaning Services accepts Airbnb cleaning enquiries across the Gold Coast for hosts and property contacts who need guest spaces prepared around booking timing, access and property presentation.",
    whoItsFor: "Airbnb cleaning is for short-stay hosts, co-hosts and property contacts managing apartments, units or homes. Each property has its own access, layout and changeover needs, so availability and scope are confirmed from the enquiry.",
    painPoints: ["Guest changeovers leave a short window for presentation tasks.", "Apartments may involve lifts, keys, parking and building rules.", "High-use kitchens and bathrooms need consistent attention.", "Hosts need clear communication about the property and timing."],
    scope: ["Guest bedrooms and living areas", "Kitchens, bathrooms and high-use surfaces", "Floors and general arrival presentation", "Property access and timing requirements", "A turnover scope discussed for the individual listing"],
    quoteFactors: ["Property size, beds and bathrooms", "Changeover timing and booking pattern", "Building, lift, key and parking access", "Requested presentation and turnover tasks"],
    approach: ["Tell LAP about the short-stay property.", "Share its Gold Coast suburb and timing needs.", "LAP follows up to confirm scope and availability."],
    faq: [
      { question: "What can Airbnb cleaning include?", answer: "Airbnb cleaning can include guest rooms, living areas, kitchens, bathrooms, floors and general arrival presentation. The exact turnover tasks depend on the listing, access and host requirements, so LAP confirms the scope for each property." },
      { question: "Do you provide same-day changeovers?", answer: "Share your usual checkout and check-in window when requesting a quote. LAP will confirm whether the timing is available for your property. The website does not promise same-day capacity before the schedule and location are reviewed." },
      { question: "Can apartment hosts request Airbnb cleaning?", answer: "Yes. Gold Coast apartment hosts can submit an enquiry. Building access, keys, lifts and parking are useful details to discuss because they affect how a turnover can be planned." },
      { question: "Is linen service included?", answer: "Linen handling is not assumed by the website. Mention your linen and bed presentation needs when LAP follows up so the requested tasks can be reviewed and clearly included or excluded from the quote." },
      { question: "How much does Airbnb cleaning cost on the Gold Coast?", answer: "Pricing depends on the property size, number of beds and bathrooms, access, turnover window and requested tasks. LAP reviews these details before providing a quote for the individual short-stay property." },
      { question: "Which Gold Coast visitor areas can request a quote?", answer: "Hosts across the Gold Coast can request a quote, including Surfers Paradise, Broadbeach, Burleigh Heads, Southport and surrounding suburbs. Availability is confirmed for the property address after enquiry." },
    ],
  },
];

export type ServiceOption = { slug: string; name: string; description: string; detailSlug?: string };

export const serviceOptions: ServiceOption[] = [
  { slug: "housekeeping", name: "Housekeeping", description: "Practical help keeping your home fresh, tidy and comfortable.", detailSlug: "home-cleaning-gold-coast" },
  { slug: "regular-casual-cleaning", name: "Regular and Casual Cleaning", description: "Ongoing or one-off cleaning built around your routine and priorities.", detailSlug: "home-cleaning-gold-coast" },
  { slug: "general-residential-commercial-cleaning", name: "General residential and commercial cleaning", description: "A clear cleaning scope for homes, offices and everyday shared spaces.", detailSlug: "office-cleaning-gold-coast" },
  { slug: "bond-cleaning", name: "End of lease cleaning / Bond cleaning", description: "A detailed rental clean planned around handover, access and timing.", detailSlug: "bond-cleaning-gold-coast" },
  { slug: "spring-cleaning", name: "Spring cleaning", description: "A considered reset for the rooms and surfaces that need extra attention.", detailSlug: "home-cleaning-gold-coast" },
  { slug: "carpet-mattress-rugs-upholstery", name: "Carpet, Mattress, Rugs and Upholstery Cleaning", description: "Specialised fabric and floor care discussed for your individual property.", detailSlug: "carpet-mattress-rugs-upholstery" },
  { slug: "personal-organisation", name: "Personal Organisation", description: "Calm, practical support to make your home feel easier to use.", detailSlug: "personal-organisation" },
];

export const googleReviews = [
  { name: "Matheus Bessa", profileReviews: "6 reviews", body: "Excellent professionals for cleaning services here on the Gold Coast! Layra and the team always show exceptional service, care and great communication as well! Highly recommend for anyone looking for residential or commercial cleaning services on the Gold Coast" },
  { name: "Bárbara Demarque Dias", profileReviews: "5 reviews", body: "I had a great experience with LAP Services! Everything ran smoothly from start to finish, and the team did an amazing job. My house was absolutely spotless and looked fantastic. Highly recommend their services!" },
  { name: "Carla Grando Comin", profileReviews: "6 reviews", body: "Layra is very attentive, and her team is amazing. They always provide a high-quality and excellent service. I highly recommend them!" },
  { name: "Renata Cardoso", profileReviews: "9 reviews", body: "I had an amazing experience with LAP Services. My house was shining and spotless. Thanks Layra for providing an amazing work! Highly recommend!" },
];

export type Suburb = { slug: string; name: string; region: string; landmarks: string[]; propertyContext: string; localNeed: string };

export const suburbs: Suburb[] = [
  { slug: "southport", name: "Southport", region: "central Gold Coast", landmarks: ["Broadwater Parklands", "Australia Fair", "Gold Coast University Hospital"], propertyContext: "Southport combines apartments, established homes, professional suites and busy medical and commercial precincts.", localNeed: "Apartment access, shared facilities and client-facing workplaces make clear cleaning scopes especially useful in Southport." },
  { slug: "surfers-paradise", name: "Surfers Paradise", region: "central Gold Coast", landmarks: ["Cavill Avenue", "Surfers Paradise Beach", "SkyPoint"], propertyContext: "Surfers Paradise is known for high-rise apartments, short-stay accommodation and busy visitor precincts close to the beach.", localNeed: "Lift access, parking, keys and short-stay changeover windows are common details to clarify for Surfers Paradise properties." },
  { slug: "broadbeach", name: "Broadbeach", region: "central Gold Coast", landmarks: ["Kurrawa Beach", "Pacific Fair", "Gold Coast Convention and Exhibition Centre"], propertyContext: "Broadbeach includes beachside apartments, visitor accommodation, offices, retail and established residential streets.", localNeed: "A mix of guest properties, homes and workplaces creates demand for cleaning plans that fit different access and presentation needs." },
  { slug: "mermaid-beach", name: "Mermaid Beach", region: "central Gold Coast", landmarks: ["Mermaid Beach", "Nobby Beach precinct", "Pacific Fair"], propertyContext: "Mermaid Beach brings together coastal homes, apartments and hospitality-focused properties near major shopping and dining areas.", localNeed: "Sand, coastal exposure and compact apartment access are practical considerations when discussing a Mermaid Beach clean." },
  { slug: "burleigh-heads", name: "Burleigh Heads", region: "southern Gold Coast", landmarks: ["Burleigh Head National Park", "James Street", "Burleigh Beach"], propertyContext: "Burleigh Heads includes beach apartments, established houses, creative workplaces and busy hospitality areas.", localNeed: "Coastal homes, short-stay spaces and active business precincts each benefit from a clearly defined cleaning priority list." },
  { slug: "palm-beach", name: "Palm Beach", region: "southern Gold Coast", landmarks: ["Palm Beach Parklands", "Tallebudgera Creek", "Currumbin Creek"], propertyContext: "Palm Beach has coastal apartments, family homes and growing local business areas between two creek systems.", localNeed: "Beachside living can bring sand and frequent use of indoor-outdoor spaces, while apartments may add access considerations." },
  { slug: "robina", name: "Robina", region: "central Gold Coast", landmarks: ["Robina Town Centre", "Cbus Super Stadium", "Bond University"], propertyContext: "Robina combines family homes, apartments, medical suites, offices and major retail and education precincts.", localNeed: "The variety of homes and professional spaces means the quote should identify the property type and who uses it." },
  { slug: "varsity-lakes", name: "Varsity Lakes", region: "central Gold Coast", landmarks: ["Lake Orr", "Varsity Lakes station", "Bond University"], propertyContext: "Varsity Lakes includes lakeside homes, apartments, professional offices and student-oriented accommodation.", localNeed: "Shared buildings, compact offices and busy household schedules are useful context when planning cleaning priorities." },
  { slug: "mudgeeraba", name: "Mudgeeraba", region: "Gold Coast hinterland", landmarks: ["Mudgeeraba Village", "Firth Park", "Springbrook Road"], propertyContext: "Mudgeeraba features established family homes, larger blocks and village businesses near the Gold Coast hinterland.", localNeed: "Larger layouts and indoor-outdoor living can change the time and priority areas involved in a Mudgeeraba clean." },
  { slug: "hope-island", name: "Hope Island", region: "northern Gold Coast", landmarks: ["Sanctuary Cove", "Hope Island Marketplace", "Hope Island Resort"], propertyContext: "Hope Island includes waterfront homes, gated communities, apartments and retail and hospitality destinations.", localNeed: "Property access, community rules and larger home layouts are important details to share in a Hope Island quote request." },
  { slug: "coomera", name: "Coomera", region: "northern Gold Coast", landmarks: ["Westfield Coomera", "Coomera station", "Dreamworld"], propertyContext: "Coomera is a fast-growing northern Gold Coast area with newer family homes, townhouses, apartments and commercial centres.", localNeed: "Family schedules, multi-level homes and mixed residential developments shape the practical cleaning needs in Coomera." },
  { slug: "upper-coomera", name: "Upper Coomera", region: "northern Gold Coast", landmarks: ["Coomera City Centre", "Reserve Road", "Upper Coomera Centre"], propertyContext: "Upper Coomera has family housing, townhouses, schools, local offices and expanding community facilities.", localNeed: "Busy family homes and growing local workplaces often need cleaning scoped around high-use rooms and realistic access times." },
];

export const priorityCombos = [
  ["home-cleaning", "southport"], ["office-cleaning", "southport"], ["bond-cleaning", "southport"],
  ["airbnb-cleaning", "surfers-paradise"], ["bond-cleaning", "surfers-paradise"],
  ["airbnb-cleaning", "broadbeach"], ["office-cleaning", "broadbeach"],
  ["home-cleaning", "burleigh-heads"], ["airbnb-cleaning", "burleigh-heads"],
  ["office-cleaning", "robina"], ["corporate-cleaning", "robina"], ["bond-cleaning", "robina"],
] as const;

export const comboPages = priorityCombos.map(([serviceBase, suburbSlug]) => ({
  slug: `${serviceBase}-${suburbSlug}`,
  service: services.find((item) => item.baseSlug === serviceBase)!,
  suburb: suburbs.find((item) => item.slug === suburbSlug)!,
}));

export const globalFaqs = [
  { question: "What cleaning services does LAP offer on the Gold Coast?", answer: "LAP Cleaning Services accepts enquiries for home cleaning, office cleaning, bond cleaning, corporate cleaning and Airbnb cleaning across the Gold Coast, Queensland. Each service has a dedicated page explaining who it is for, what can be discussed and which details shape a quote." },
  { question: "Which areas does LAP Cleaning Services cover?", answer: "LAP Cleaning Services serves the Gold Coast, Queensland only. Enter your suburb in the quote survey so the team can confirm availability for your address. No other region is represented as part of the service area." },
  { question: "How do I request a cleaning quote?", answer: "Choose the cleaning service, enter your Gold Coast suburb, select when you need help and provide your name and phone number. Email is optional. LAP then reviews the information and follows up using the details you supplied." },
  { question: "Is the quote request free?", answer: "Yes. The website describes the enquiry as a free quote request and does not collect payment details. A service is not booked simply by completing the survey; LAP still needs to confirm the scope and availability." },
  { question: "Do you publish prices online?", answer: "LAP does not publish a generic price list because the relevant factors differ by service, property, condition, access and timing. The quote survey collects the essential starting details so the response can be tailored to the actual job." },
  { question: "Can I request cleaning for an apartment?", answer: "Yes. Apartment residents, tenants and short-stay hosts can request a quote. Lift access, parking, building rules and key arrangements are useful details to discuss when LAP follows up." },
  { question: "Do you offer cleaning outside the Gold Coast?", answer: "No other service region is represented on this website. LAP Cleaning Services is positioned as a Gold Coast cleaning business and all service and location pages focus on Gold Coast, Queensland." },
  { question: "What information is required in the quote form?", answer: "Name and phone number are required so LAP can respond. You also choose a service, suburb and preferred timing. Email is optional. Hidden technical fields record the enquiry page, referral source and campaign information for lead attribution." },
];

export const guides = [
  { slug: "cleaning-services-gold-coast-cost-guide", title: "What affects cleaning service prices on the Gold Coast?", description: "A practical guide to the property, scope, access and timing details that shape a cleaning quote.", intro: "Cleaning prices on the Gold Coast vary because properties and service scopes vary. A useful quote considers the type of cleaning, the property layout, its current condition, access and the timing you need. This guide explains what to prepare before asking for a price.", sections: [
    ["The service type changes the scope", "A regular home clean, an office clean, a bond clean and a short-stay turnover solve different problems. Each needs different detail, equipment planning and time. Start by choosing the closest service rather than asking for one generic cleaning rate."],
    ["Property size is only one factor", "Bedrooms, bathrooms and floor area matter, but layout and use matter too. A compact apartment with lift restrictions can involve different planning from an accessible family home. Workplaces also vary by amenities and shared zones."],
    ["Condition and priorities shape the quote", "Describe what needs attention instead of relying on broad labels. Kitchens, bathrooms, floors, empty rental rooms and guest presentation can each change the scope. Clear priorities help the cleaner understand the outcome you expect."],
    ["Access and timing deserve an early mention", "Parking, keys, lifts, building rules and short service windows can affect how a clean is organised. Share these details during follow-up so the quote reflects the real property rather than an idealised version of it."],
  ]},
  { slug: "how-to-choose-cleaner-gold-coast", title: "How to choose a cleaning service on the Gold Coast", description: "Questions to ask before choosing a cleaner for your home, office, rental or short-stay property.", intro: "Choose a cleaning service by checking fit, scope and communication before comparing promises. The right provider should understand your property type, Gold Coast suburb, access requirements and priorities. A clear quote process is more useful than broad claims that cannot be checked.", sections: [
    ["Check the service matches the property", "Look for a dedicated service page that speaks to your situation. Home, office, bond, corporate and Airbnb cleaning have different workflows. A provider that separates them makes it easier to discuss the right scope."],
    ["Ask what is included and excluded", "A useful conversation names the rooms, surfaces and tasks to be covered. It should also identify anything outside scope. Written clarity reduces misunderstandings and helps you compare quotes fairly."],
    ["Discuss access before booking", "For apartments and workplaces, ask how lifts, keys, parking and building rules will be handled. For occupied homes, discuss the practical arrival arrangement. Access should never be left as a last-minute surprise."],
    ["Verify reviews and business claims", "Use genuine third-party profiles when available. Check that ratings, insurance statements, licences, years in business and guarantees are supported rather than simply displayed as decorative badges."],
  ]},
  { slug: "bond-cleaning-preparation-checklist", title: "Bond cleaning preparation checklist for Gold Coast renters", description: "A straightforward checklist to make the quote and handover process easier to plan.", intro: "Prepare for bond cleaning by confirming the handover date, property condition and access before the clean. Moving is already busy, so a short information checklist helps LAP understand the rental and discuss a more accurate service scope.", sections: [
    ["Confirm the property timeline", "Know when furniture and personal items will be removed, when keys are available and when the property must be handed back. The cleaning window should fit between those points rather than compete with movers."],
    ["List rooms and priority areas", "Record the number of bedrooms and bathrooms, the kitchen condition, floors and any areas that need discussion. Photos may also help during follow-up if the business requests them."],
    ["Explain access clearly", "Apartment renters should mention lifts, loading zones, parking, keys and building rules. House access may involve gates or lock arrangements. Confirm details directly before the service date."],
    ["Read your tenancy documents", "Cleaning requirements can vary. Review the entry condition report, agreement and any lawful instructions relevant to your tenancy. A cleaner cannot guarantee decisions that remain with other parties."],
  ]},
  { slug: "airbnb-cleaning-turnover-guide-gold-coast", title: "Airbnb cleaning: planning smoother Gold Coast turnovers", description: "What hosts should clarify about access, timing and presentation before requesting a turnover quote.", intro: "A smoother short-stay turnover starts with a realistic window and a property-specific checklist. Gold Coast apartments and holiday homes differ in access, layout and presentation, so hosts should clarify the essentials before relying on a cleaning schedule.", sections: [
    ["Map the real turnover window", "Use the time between guest departure and the next arrival, then subtract the time needed for access, inspection and any host tasks. Share that practical window rather than only the advertised check-in time."],
    ["Document the guest-ready standard", "Describe how bedrooms, bathrooms, kitchens and living areas should look. If linen, consumables or damage reporting are important, ask whether they can be included instead of assuming they form part of a basic clean."],
    ["Make access repeatable", "Key safes, reception desks, parking and lift rules need a consistent plan. Surfers Paradise and Broadbeach apartments can have building-specific arrangements, so the process should be confirmed for the exact property."],
    ["Keep communication tied to the property", "Use one property name or address reference, one current checklist and one contact method. Clear information helps everyone understand which listing, turnover and priority is being discussed."],
  ]},
] as const;

export function getService(slug: string) { return services.find((service) => service.slug === slug); }
export function getSuburb(slug: string) { return suburbs.find((suburb) => suburb.slug === slug); }
