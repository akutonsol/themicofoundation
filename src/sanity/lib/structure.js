// https://www.sanity.io/docs/structure-builder-cheat-sheet

export const structure = (S) =>
  S.list()
    .title('MICO Foundation')
    .items([

      // ── HOME ──────────────────────────────────────
      S.listItem()
        .title('🏠 Home')
        .child(
          S.list()
            .title('Home Sections')
            .items([
              S.listItem().title('Hero').child(S.documentTypeList('hero').title('Hero')),
              S.listItem().title('Trusted By').child(S.documentTypeList('trustedBy').title('Trusted By')),
              S.listItem().title('Mission & Vision').child(S.documentTypeList('mission').title('Mission & Vision')),
              S.listItem().title('Legacy Impact').child(S.documentTypeList('legacyImpact').title('Legacy Impact')),
              S.listItem().title('Projects').child(S.documentTypeList('project').title('Projects')),
              S.listItem().title('Community Impact').child(S.documentTypeList('communityImpact').title('Community Impact')),
              S.listItem().title('Messages Section Settings').child(S.documentTypeList('messagesSection').title('Messages Section Settings')),
              S.listItem().title('Team Messages').child(S.documentTypeList('teamMessage').title('Team Messages')),
              S.listItem().title('People Impact').child(S.documentTypeList('peopleImpact').title('People Impact')),
              S.listItem().title('News & Events (Featured)').child(
                S.documentList().title('Featured News & Events')
                  .apiVersion('2024-01-01')
                  .filter('_type == "newsEvent" && isFeatured == true')
              ),
              S.listItem().title('Publications').child(S.documentTypeList('publication').title('Publications')),
              S.listItem().title('FAQ').child(S.documentTypeList('faq').title('FAQ')),
              S.listItem().title('Newsletter Subscribers').child(S.documentTypeList('newsletterSubscriber').title('Newsletter Subscribers')),
            ])
        ),

      S.divider(),

      // ── ANNIVERSARY POPUP ─────────────────────────
      S.listItem()
        .title('🎉 Anniversary Popup')
        .child(S.documentTypeList('anniversaryPopup').title('Anniversary Popup')),

      S.divider(),

      // ── ABOUT ─────────────────────────────────────
      S.listItem()
        .title('ℹ️ About')
        .child(
          S.list()
            .title('About')
            .items([
              S.listItem().title('Our History Text').child(S.documentTypeList('aboutContent').title('Our History Text')),
              S.listItem().title('Foundation Video & Decks').child(S.documentTypeList('foundationVideo').title('Foundation Video & Decks')),
              S.listItem().title('Our Mission & Values').child(S.documentTypeList('ourMission').title('Our Mission & Values')),
              S.listItem().title('📖 Magazine').child(S.documentTypeList('magazine').title('Magazine')),
              S.listItem().title('Chairmans').child(
                S.documentList().title('Chairmans')
                  .apiVersion('2024-01-01')
                  .filter('_type == "historicalPerson" && type == "chairman"')
              ),
              S.listItem().title('Secretary Managers').child(
                S.documentList().title('Secretary Managers')
                  .apiVersion('2024-01-01')
                  .filter('_type == "historicalPerson" && type == "secretary"')
              ),
            ])
        ),

      S.divider(),

      // ── HISTORY ───────────────────────────────────
      S.listItem()
        .title('📜 History')
        .child(
          S.list()
            .title('History')
            .items([
              S.listItem().title('History Page Content').child(S.documentTypeList('historyPage').title('History Page Content')),
            ])
        ),

      S.divider(),

      // ── TEAM ──────────────────────────────────────
      S.listItem()
        .title('👥 Team')
        .child(
          S.list()
            .title('Team')
            .items([
              S.listItem().title('Board of Directors').child(
                S.documentList().title('Board of Directors')
                  .apiVersion('2024-01-01')
                  .filter('_type == "teamMember" && type == "board"')
              ),
              S.listItem().title('Staff').child(
                S.documentList().title('Staff')
                  .apiVersion('2024-01-01')
                  .filter('_type == "teamMember" && type == "staff"')
              ),
            ])
        ),

      S.divider(),

      // ── TRUSTEES ──────────────────────────────────
      S.listItem()
        .title('🏛️ Trustees')
        .child(
          S.list()
            .title('Trustees')
            .items([
              S.listItem().title('Legacy Section Content').child(S.documentTypeList('trusteeLegacy').title('Legacy Section Content')),
              S.listItem().title('Lead Trustee Message').child(S.documentTypeList('trusteeLeader').title('Lead Trustee Message')),
              S.listItem().title('Current Trustees').child(
                S.documentList().title('Current Trustees')
                  .apiVersion('2024-01-01')
                  .filter('_type == "teamMember" && type == "trustee"')
              ),
              S.listItem().title('Former Trustees').child(S.documentTypeList('formerTrustee').title('Former Trustees')),
            ])
        ),

      S.divider(),

      // ── PROJECTS ──────────────────────────────────
      S.listItem()
        .title('🚧 Projects')
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem().title('Active Projects').child(
                S.documentList().title('Active Projects')
                  .apiVersion('2024-01-01')
                  .filter('_type == "project" && status == "active"')
              ),
              S.listItem().title('Completed Projects').child(
                S.documentList().title('Completed Projects')
                  .apiVersion('2024-01-01')
                  .filter('_type == "project" && (status == "completed" || status == "complete")')
              ),
              S.listItem().title('All Projects').child(S.documentTypeList('project').title('All Projects')),
              S.listItem().title('Project Initiatives (Accordion)').child(S.documentTypeList('projectInitiative').title('Project Initiatives')),
            ])
        ),

      S.divider(),

      // ── NEWS & EVENTS ─────────────────────────────
      S.listItem()
        .title('📰 News & Events')
        .child(
          S.list()
            .title('News & Events')
            .items([
              S.listItem().title('News Articles').child(
                S.documentList().title('News Articles')
                  .apiVersion('2024-01-01')
                  .filter('_type == "newsEvent" && type == "news"')
              ),
              S.listItem().title('Upcoming Events').child(
                S.documentList().title('Upcoming Events')
                  .apiVersion('2024-01-01')
                  .filter('_type == "newsEvent" && type == "upcoming"')
              ),
              S.listItem().title('Announcements').child(
                S.documentList().title('Announcements')
                  .apiVersion('2024-01-01')
                  .filter('_type == "newsEvent" && type == "announcement"')
              ),
              S.listItem().title('All News & Events').child(S.documentTypeList('newsEvent').title('All News & Events')),
            ])
        ),

      S.divider(),

      // ── RESOURCE CENTER ───────────────────────────
      S.listItem()
        .title('📁 Resource Center')
        .child(S.documentTypeList('resourceCategory').title('Resource Categories')),

      S.divider(),

      // ── WORK WITH US ──────────────────────────────
      S.listItem()
        .title('🤝 Work With Us')
        .child(
          S.list()
            .title('Work With Us')
            .items([
              S.listItem().title('Hero & Cards').child(S.documentTypeList('workWithUs').title('Hero & Cards')),
              S.listItem().title('Sponsorship Submissions').child(S.documentTypeList('sponsorshipSubmission').title('Sponsorship Submissions')),
            ])
        ),

      S.divider(),

      // ── ENDOWMENTS ────────────────────────────────
      S.listItem()
        .title('🎓 Endowments')
        .child(
          S.list()
            .title('Endowments')
            .items([
              S.listItem().title('Page Content').child(S.documentTypeList('endowment').title('Page Content')),
              S.listItem().title('Endowment Submissions').child(S.documentTypeList('endowmentSubmission').title('Endowment Submissions')),
            ])
        ),

      S.divider(),

      // ── PLEDGE ────────────────────────────────────
      S.listItem()
        .title('🤲 Pledge')
        .child(
          S.list()
            .title('Pledge')
            .items([
              S.listItem().title('Pledge Project').child(S.documentTypeList('endowmentproject').title('Pledge Project')),
              S.listItem().title('Pledge Submissions').child(S.documentTypeList('pledgeSubmission').title('Pledge Submissions')),
            ])
        ),

      S.divider(),

      // ── CONTACT ───────────────────────────────────
      S.listItem()
        .title('📬 Contact')
        .child(
          S.list()
            .title('Contact')
            .items([
              S.listItem().title('Contact Settings').child(S.documentTypeList('contactSettings').title('Contact Settings')),
              S.listItem().title('Contact Submissions').child(S.documentTypeList('contactSubmission').title('Contact Submissions')),
            ])
        ),

      S.divider(),

      // ── DONATIONS ─────────────────────────────────
      S.listItem()
        .title('💰 Donations')
        .child(
          S.list()
            .title('Donations')
            .items([
              S.listItem().title('Donation Records').child(S.documentTypeList('donation').title('Donation Records')),
            ])
        ),

      S.divider(),

      // ── SETTINGS ──────────────────────────────────
      S.listItem()
        .title('⚙️ Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem().title('Testimonials').child(S.documentTypeList('testimonial').title('Testimonials')),
              S.listItem().title('Site Statistics').child(S.documentTypeList('siteStats').title('Site Statistics')),
            ])
        ),
    ])