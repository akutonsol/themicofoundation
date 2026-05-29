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
              S.listItem()
                .title('Hero')
                .child(S.documentTypeList('hero').title('Hero')),

              S.listItem()
                .title('Trusted By')
                .child(S.documentTypeList('trustedBy').title('Trusted By')),

              S.listItem()
                .title('Legacy Impact')
                .child(S.documentTypeList('legacyImpact').title('Legacy Impact')),

              S.listItem()
                .title('Projects')
                .child(S.documentTypeList('project').title('Projects')),

              S.listItem()
                .title('Community Impact')
                .child(S.documentTypeList('communityImpact').title('Community Impact')),

              S.listItem()
                .title('Messages Section Settings')
                .child(S.documentTypeList('messagesSection').title('Messages Section Settings')),

              S.listItem()
                .title('Team Messages')
                .child(S.documentTypeList('teamMessage').title('Team Messages')),

              S.listItem()
                .title('People Impact')
                .child(S.documentTypeList('peopleImpact').title('People Impact')),

              S.listItem()
                .title('News & Events (Featured)')
                .child(
                  S.documentList()
                    .title('Featured News & Events')
                    .filter('_type == "newsEvent" && isFeatured == true')
                ),

              S.listItem()
                .title('Publications')
                .child(S.documentTypeList('publication').title('Publications')),

              S.listItem()
                .title('FAQ')
                .child(S.documentTypeList('faq').title('FAQ')),

              S.listItem()
                .title('Newsletter Subscribers')
                .child(S.documentTypeList('newsletterSubscriber').title('Newsletter Subscribers')),
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
              S.listItem()
                .title('Board of Directors')
                .child(
                  S.documentList()
                    .title('Board of Directors')
                    .filter('_type == "teamMember" && type == "board"')
                ),

              S.listItem()
                .title('Staff')
                .child(
                  S.documentList()
                    .title('Staff')
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
              S.listItem()
                .title('Legacy Section Content')
                .child(S.documentTypeList('trusteeLegacy').title('Legacy Section Content')),

              S.listItem()
                .title('Current Trustees (Board)')
                .child(
                  S.documentList()
                    .title('Current Trustees')
                    .filter('_type == "teamMember" && type == "board"')
                ),

              S.listItem()
                .title('Former Trustees')
                .child(S.documentTypeList('formerTrustee').title('Former Trustees')),
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
              S.listItem()
                .title('News Articles')
                .child(
                  S.documentList()
                    .title('News Articles')
                    .filter('_type == "newsEvent" && type == "news"')
                ),

              S.listItem()
                .title('Upcoming Events')
                .child(
                  S.documentList()
                    .title('Upcoming Events')
                    .filter('_type == "newsEvent" && type == "upcoming"')
                ),

              S.listItem()
                .title('Announcements')
                .child(
                  S.documentList()
                    .title('Announcements')
                    .filter('_type == "newsEvent" && type == "announcement"')
                ),

              S.listItem()
                .title('All News & Events')
                .child(S.documentTypeList('newsEvent').title('All News & Events')),
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
              S.listItem()
                .title('Donation Records')
                .child(S.documentTypeList('donation').title('Donation Records')),
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
              S.listItem()
                .title('Testimonials')
                .child(S.documentTypeList('testimonial').title('Testimonials')),
            ])
        ),
    ])