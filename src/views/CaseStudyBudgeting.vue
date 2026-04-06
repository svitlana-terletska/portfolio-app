<template>
  <section class="case-wrapper">
    <DescriptionSection
      :descriptionData="budgetingDescriptionData"
      :prototypeLinks="currentPrototypeLinkContent.linkBlocks"
    />
    <OverviewSection :overviewContent="budgetingOverviewContent" />
    <UserResearchSection :researchContent="budgetingUserResearchContent" />
    <PersonasSection :personas="caseStudyPersonas" />
    <CompetitiveAuditSection :auditContent="currentCompetitiveAuditContent" />
    <DesignDecisionsSection :designContent="currentDesignDecisionContent" />

    <LoFiPrototypeLink :linkContent="lofiPrototypeLinkContent" />
    <UsabilityStudySection :usabilityContent="currentUsabilityStudyContent" />
    <MockupGallery :galleryContent="currentMockupGalleryContent" />

    <PrototypeLink :linkContent="currentPrototypeLinkContent" />
    <AccessibilitySection :accessibilityContent="currentAccessibilityContent" />
    <TakeawaysSection :takeawaysContent="currentTakeawaysContent" />
    <CaseStudyNav
      :prevCaseStudy="prevCaseStudy"
      :nextCaseStudy="nextCaseStudy"
    />
  </section>
</template>
  
  <script>
import DescriptionSection from "@/components/DescriptionSection.vue";
import OverviewSection from "@/components/OverviewSection.vue";
import UserResearchSection from "@/components/UserResearchSection.vue";
import PersonasSection from "@/components/PersonasSection.vue";
import CompetitiveAuditSection from "@/components/CompetitiveAuditSection.vue";
import DesignDecisionsSection from "@/components/DesignDecisionsSection.vue";
import LoFiPrototypeLink from "@/components/LoFiPrototypeLink.vue";
import UsabilityStudySection from "@/components/UsabilityStudySection.vue";
import MockupGallery from "@/components/MockupGallery.vue";
import PrototypeLink from "@/components/PrototypeLink.vue";
import AccessibilitySection from "@/components/AccessibilitySection.vue";
import TakeawaysSection from "@/components/TakeawaysSection.vue";
import CaseStudyNav from "@/components/CaseStudyNav.vue";

export default {
  name: "CaseStudyRabbitry",
  components: {
    DescriptionSection,
    OverviewSection,
    UserResearchSection,
    PersonasSection,
    CompetitiveAuditSection,
    DesignDecisionsSection,
    LoFiPrototypeLink,
    UsabilityStudySection,
    MockupGallery,
    PrototypeLink,
    AccessibilitySection,
    TakeawaysSection,
    CaseStudyNav,
  },
  data() {
    return {
      // Data for the DescriptionSection
      budgetingDescriptionData: {
        tableData: [
          {
            label: "Case Study",
            value: "Budgeting Application and Website",
          },
          { label: "Role", value: "UI/UX Designer" },
          { label: "Timeline", value: "March-April 2024" },
          { label: "Scope", value: "Mobile App and Website Design" },
          { label: "Tools", value: "Figma, Affinity Designer" },
          {
            label: "Responsibilities",
            value:
              "user research and analysis, competitive audit, persona, user journey, wireframing, prototyping, usability testing, UI and logo design",
          },
        ],
        imageSrc: new URL("@/assets/Budgeting.png", import.meta.url).href,
        imageAlt: "Budgeting project mockups",
      },
      // Data for the Overview Section in Budgeting case study
      budgetingOverviewContent: {
        problem:
          "Users need a budgeting solution that seamlessly integrates with their financial institutions, enables efficient transaction tracking, supports goal setting, and offers flexible budgeting options.",
        goal: "Design a budget management tool that integrates with user accounts, supports financial goal-setting, provides visual representations of personal finances, and offers a variety of budgeting methods to accommodate users with different income types.",
      },
      // Data for the User Research Section
      budgetingUserResearchContent: {
        introTitle: "User Research Insights",
        introParagraph:
          "User research revealed that people prioritize key features in a budgeting application, such as transaction tracking, trend analysis, expense categorization, budget setting, and seamless integration with their financial institutions.",
        painPointsTitle: "User Pain Points",
        painPoints: [
          {
            number: 1,
            headline: "Manual input",
            description:
              "Manual entry is required for certain types of spending, which can be time-consuming and inconvenient for users.",
          },
          {
            number: 2,
            headline: "Seting up goals",
            description:
              "Limited flexibility in goal creation, as some platforms require users to open specific bank accounts, restricting their ability to set goals freely",
          },
          {
            number: 3,
            headline: "Accounts integration",
            description:
              "Inability to add expenses from other accounts can reduce budget accuracy and hinder effective financial planning.",
          },
          {
            number: 4,
            headline: "Budgeting",
            description: "Limited budget management options.",
          },
        ],
      },
      // Data for the Personas Section
      caseStudyPersonas: [
        {
          name: "Primary Persona",
          image: new URL(
            "../assets/budgeting-persona-primary.jpg",
            import.meta.url
          ).href,
          problemStatementHeading: "Problem Statement",
          problemStatementDescription:
            "Sarah is a marketing manager with a busy schedule who needs an automated budgeting solution that integrates easily into her routine because traditional methods are too time-consuming, making it hard to manage her finances and reach her goals.",
          journeyMapUrl: new URL(
            "../assets/journeymap-budgeting.jpg",
            import.meta.url
          ).href,
        },
        {
          name: "Secondary Persona",
          image: new URL(
            "../assets/budgeting-persona-secondary.jpg",
            import.meta.url
          ).href,
          problemStatementHeading: "Problem Statement",
          problemStatementDescription:
            "Alex is a freelancer with a dynamic lifestyle and fluctuating income who needs a budgeting solution that adapts to his irregular earnings because the budgeting tools he previously used are too rigid and fail to reflect the reality of his variable income and spending habits.",
        },
      ],

      // --- Competitive Audit Content Variations ---

      competitiveAudit_OnlyImage: {
        paragraphs: [],
        lists: [],
        imageUrl: new URL(
          "../assets/budgeting-competitors.png",
          import.meta.url
        ).href,
        imageAlt: "Competitive Audit Diagram",
      },

      currentCompetitiveAuditContent: {
        paragraphs: [],
        lists: [],
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },

      // --- Design Decisions Content Variations ---

      // Variation 2: Big Image at the beginning, then Feature Highlights
      designDecisions_Variation2: {
        sectionTitle: "Design Decisions",
        paragraphs: [],
        flexibleContentBlocks: [],
        bigImage: {
          imageUrl: new URL("../assets/sitemap-budgeting.png", import.meta.url)
            .href,
          imageAlt: "Budgeting App Sitemap Diagram",
          caption: "Budgeting App Sitemap.",
        },
        prototypeLink: {},
        featureHighlights: [
          {
            imageUrl: new URL("../assets/budgeting-lofi-1.png", import.meta.url)
              .href,
            imageAlt: "Link Accounts screen",
            description:
              "Allows users to automatically connect their financial accounts or skip directly to manual data input",
          },
          {
            imageUrl: new URL("../assets/budgeting-lofi-2.png", import.meta.url)
              .href,
            imageAlt: " Fixed Expenses screen",
            description:
              "Automatically pulls data from linked accounts and allows for adding missing expenses manually.",
          },
          {
            imageUrl: new URL("../assets/budgeting-lofi-3.png", import.meta.url)
              .href,
            imageAlt:
              "Lo-fi prototype screen of the budgeting app that allows users to add their variable sources of income",
            description:
              "Allows users to add variable income sources and manually enter expenses not reflected in linked accounts.",
          },
          {
            imageUrl: new URL("../assets/budgeting-lofi-5.png", import.meta.url)
              .href,
            imageAlt:
              "Lo-fi prototype screen of the budgeting app that allows users to Set up and track goals completion status",
            description: "Set up and track goal's completion status.",
          },
          {
            imageUrl: new URL("../assets/budgeting-lofi-4.png", import.meta.url)
              .href,
            imageAlt:
              "Lo-fi prototype screen of the budgeting app that allows users to choose between different budgeting methods",
            description:
              "Choose between different budgeting methods. Easy switch between methods to find the one that works best.",
          },

          {
            imageUrl: new URL("../assets/budgeting-lofi-6.png", import.meta.url)
              .href,
            imageAlt:
              "Lo-fi prototype screen of the budgeting app that allows users to view the expense categories, displays the current budgeting method, allows quick switching between budgeting methods, offers access to goal settings, and shows remaining income allocated to savings with a breakdown by each savings goal.",
            description:
              "Provides a scrollable view of expense categories, displays the current budgeting method, allows quick switching between budgeting methods, offers access to goal settings, and shows remaining income allocated to savings with a breakdown by each savings goal.",
          },
          {
            imageUrl: new URL("../assets/budgeting-lofi-7.png", import.meta.url)
              .href,
            imageAlt:
              "Lo-fi prototype screen of the budgeting app that allows users to set due dates reminders and enable autopayments",
            description:
              "Allows to set due dates reminders and enable autopayments.",
          },
          {
            imageUrl: new URL("../assets/budgeting-lofi-8.png", import.meta.url)
              .href,
            imageAlt:
              "Lo-fi prototype screen of the budgeting app that allows users to track and compare spending against the previous month",
            description:
              "Track and compare spending against the previous month.",
          },
          {
            imageUrl: new URL("../assets/budgeting-lofi-9.png", import.meta.url)
              .href,
            imageAlt:
              "Lo-fi prototype screen of the budgeting app that allows users to see a high-level overview of their financial health, providing quick insights into income, expenses, savings, and overall budget performance.",
            description:
              "A high-level overview of the user's financial health, providing quick insights into income, expenses, savings, and overall budget performance.",
          },
        ],
        loFidelityPrototypeSection: {},
      },

      currentDesignDecisionContent: {
        sectionTitle: "Design Decisions",
        paragraphs: [],
        flexibleContentBlocks: [],
        bigImage: {},
        prototypeLink: {},
        featureHighlights: [],
        loFidelityPrototypeSection: {},
      },
      //Lo-Fi Prototype Link Section for Budgeting
      lofiPrototypeLinkContent: {
        sectionTitle: "Lo-fidelity prototype",
        linkBlocks: [
          {
            heading: "Lo-Fi Prototype",
            url: "https://www.figma.com/proto/bXiFTb5YwbCBpdUAc4IGau/Budgeting-App?page-id=0%3A1&type=design&node-id=5-268&viewport=278%2C219%2C0.51&t=eYUHTKeWm4xMlTro-1&scaling=scale-down&starting-point-node-id=5%3A268&mode=design",
            linkText: "View Lo-Fi Prototype",
          },
        ],
        imageUrl: new URL("../assets/figma-lofi-budgeting.png", import.meta.url)
          .href,
        imageAlt:
          "The screenshot of the Figma lo-fi prototype view of the budgeting app",
      },

      // --- Usability Study Content Variations ---

      /*  For Budgeting Case Study - Variation 2 */
      usabilityStudy_Variation2: {
        sectionTitle: "Usability Study Findings",
        introParagraph:
          "Unmoderated usability study was conducted to test the lo-fidelity prototype.",
        type: "one-column-list",
        list: {
          heading: "Primary Findings",
          items: [
            "The 'Choose Budgeting Method'screen does not clearly communicate what each budgeting method involves.",
            "Users expect the report to include their income data.",
          ],
        },
      },

      // --- Select the current content for the Usability Study Section ---
      currentUsabilityStudyContent: {
        sectionTitle: "Usability Study Findings",
        introParagraph: "",
        type: "default",
        lists: [],
        list: {},
        block: {},
        bottomImages: [],
      },

      // --- Mockup Gallery Content Variations ---

      //Budgeting Mockup Gallery
      mockupGallery_Variation2: {
        sectionTitle: "Mockups",
        introParagraph:
          "Focusing on core functionalities, these mockups illustrate the refined user experience for key interactions.",
        type: "text-images-grid-and-bottom-image",
        sections: [
          {
            textBlock: {
              heading: "Clarifying Income and Expenses with a Cash Flow Report",
              paragraphs: [
                "To help users better understand their finances, the Spending Report was redesigned as a Cash Flow Report that clearly outlines both income and spending.",
              ],
            },
            images: [
              {
                heading: "Before",
                imageUrl: new URL(
                  "../assets/mockup-budgeting-1.png",
                  import.meta.url
                ).href,
                imageAlt: "Lo-fi Mockup of a spending report",
              },
              {
                heading: "After",
                imageUrl: new URL(
                  "../assets/mockup-budgeting-2.png",
                  import.meta.url
                ).href,
                imageAlt: "Redesigned Hi-fi mockup of a spending report",
              },
            ],
          },
          {
            textBlock: {
              heading: "Info Button Added for Budgeting Method Overview",
              paragraphs: [
                "An Info button has been added to provide a quick summary of the budgeting method.",
              ],
            },
            images: [
              {
                heading: "Before",
                imageUrl: new URL(
                  "../assets/mockup-budgeting-0.png",
                  import.meta.url
                ).href,
                imageAlt:
                  "Choose budgeting method lo-fi mockup before usability study",
              },
              {
                heading: "After",
                imageUrl: new URL(
                  "../assets/mockup-budgeting-3.png",
                  import.meta.url
                ).href,
                imageAlt:
                  "Choose budgeting method hi-fi mockup after usability study",
              },
            ],
          },
        ],
        bottomImage: {
          imageUrl: new URL("../assets/Budgeting-mockups.webp", import.meta.url)
            .href,
          imageAlt: "High-fidelity mockups of the final design.",
          imageCaption: "High-fidelity mockups of the final design.",
        },
      },

      // --- Select the current content for the Mockup Gallery Section ---
      currentMockupGalleryContent: {
        sectionTitle: "Mockup Gallery",
        introParagraph: "",
        type: "default",
        sections: [],
        bottomImage: {},
      },

      //Prototype Link Section for Budgeting
      prototypeLink_Variation2: {
        sectionTitle: "High-fidelity prototype",
        linkBlocks: [
          {
            heading: "Desktop",
            url: "https://www.figma.com/proto/bXiFTb5YwbCBpdUAc4IGau/Budgeting-App?page-id=122%3A1138&type=design&node-id=122-1652&viewport=1323%2C-14%2C0.45&t=OOTPUWzCSd2baq2H-1&scaling=min-zoom&starting-point-node-id=122%3A1652&mode=design",
            linkText: "View Desktop Prototype",
          },
          {
            heading: "Mobile",
            url: "https://www.figma.com/proto/bXiFTb5YwbCBpdUAc4IGau/Budgeting-App?page-id=63%3A557&type=design&node-id=63-591&viewport=598%2C373%2C0.29&t=JeRNksbo8JzwZcKR-1&scaling=scale-down&starting-point-node-id=63%3A591&mode=design",
            linkText: "View Mobile Prototype",
          },

          // Video Walkthrough
          {
            heading: "Video Link",
            url: "https://youtu.be/-bLWQ3msAq0",
            linkText: "View Walkthrough",
          },
        ],
        imageUrl: new URL("../assets/figma-budgeting.png", import.meta.url)
          .href,
        imageAlt:
          "The screenshot of the Figma prototype view of the budgeting app",
      },
      currentPrototypeLinkContent: {
        sectionTitle: "High-fidelity prototype",
        linkBlocks: [],
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },

      //Accessibility for Budgeting
      accessibility_Variation1: {
        sectionTitle: "Accessibility Considerations",

        type: "three-columns-paragraphs",
        columns: [
          {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM19.625 11.0801L14.585 14.1035L15.7852 16.3604L18.7363 14.5723V25.4561H14.9209V28H25.3848V25.4561H21.8086V11.0801H19.625Z" fill="#FF97B8"/>
            </svg>`, // 1
            paragraph1: "AAA color contrast on all screens.",
          },
          {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM19.1924 10.8398C18.1046 10.8399 17.0567 11.0237 16.0488 11.3916C15.0408 11.7596 14.2003 12.2484 13.5283 12.8564L14.5605 15.1602C15.2165 14.5682 15.8966 14.1363 16.6006 13.8643C17.3206 13.5763 18.0566 13.4317 18.8086 13.4316C19.7686 13.4316 20.4972 13.6397 20.9932 14.0557C21.5051 14.4716 21.7607 15.08 21.7607 15.8799C21.7607 16.2958 21.6889 16.712 21.5449 17.1279C21.401 17.5438 21.1769 17.9759 20.873 18.4238C20.585 18.8718 20.1923 19.3597 19.6963 19.8877L14.2246 25.7197V28H25.457V25.4561H18.0557L21.7852 21.5684C22.3131 21.0244 22.7609 20.5038 23.1289 20.0078C23.5128 19.4959 23.8245 18.9995 24.0645 18.5195C24.3203 18.0397 24.5042 17.5599 24.6162 17.0801C24.7442 16.5842 24.8086 16.0802 24.8086 15.5684C24.8086 14.5605 24.5931 13.704 24.1611 13C23.7291 12.296 23.0966 11.7596 22.2646 11.3916C21.4327 11.0237 20.4083 10.8398 19.1924 10.8398Z" fill="#FF97B8"/></svg>`, // 2
            paragraph1: "Allows keyboard navigation on desktop.",
          },
          {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM19.2168 10.8398C18.1288 10.8398 17.0803 11.0162 16.0723 11.3682C15.0645 11.7202 14.2246 12.2165 13.5527 12.8564L14.5605 15.1602C15.2165 14.5682 15.905 14.1363 16.625 13.8643C17.3449 13.5763 18.1212 13.4316 18.9531 13.4316C19.8808 13.4317 20.5845 13.624 21.0645 14.0078C21.5605 14.3918 21.8086 14.9525 21.8086 15.6885C21.8085 16.2163 21.6882 16.6643 21.4482 17.0322C21.2083 17.4001 20.8723 17.6886 20.4404 17.8965C20.0085 18.0883 19.4886 18.1836 18.8809 18.1836H16.457V20.7275H19.1689C20.1928 20.7276 20.9691 20.9282 21.4971 21.3281C22.0408 21.7121 22.3124 22.3039 22.3125 23.1035C22.3125 23.6475 22.1847 24.1121 21.9287 24.4961C21.6887 24.8801 21.3286 25.1684 20.8486 25.3604C20.3687 25.5523 19.7762 25.6484 19.0723 25.6484C18.1926 25.6484 17.3609 25.5121 16.5771 25.2402C15.7931 24.9682 15.0245 24.5438 14.2725 23.9678L13.2646 26.3203C13.7285 26.7202 14.2727 27.0636 14.8965 27.3516C15.5205 27.6396 16.1931 27.856 16.9131 28C17.649 28.1599 18.4011 28.2402 19.1689 28.2402C20.4328 28.2402 21.5207 28.048 22.4326 27.6641C23.3446 27.2641 24.0489 26.696 24.5449 25.96C25.0408 25.224 25.289 24.36 25.2891 23.3682C25.2891 22.6002 25.1444 21.9201 24.8564 21.3281C24.5684 20.7361 24.1524 20.2483 23.6084 19.8643C23.1978 19.5744 22.7237 19.3569 22.1855 19.2129C22.9062 18.9444 23.4934 18.524 23.9443 17.9443C24.5043 17.2084 24.7851 16.3361 24.7852 15.3281C24.7852 14.3841 24.5603 13.5837 24.1123 12.9277C23.6803 12.2559 23.0486 11.7435 22.2168 11.3916C21.3848 11.0236 20.3847 10.8399 19.2168 10.8398Z" fill="#FF97B8"/>`, // 3
            paragraph1: "Charts have legends paired with descriptive text.",
          },
        ],
      },
      currentAccessibilityContent: {
        sectionTitle: "Accessibility",
        introParagraph: "",
        type: "default",
        columns: [],
      },
      //Budgeting
      takeaways_Variation2: {
        nextStepsHeading: "Next Steps",
        type: "next-steps-three-columns",
        columns: [
          {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM19.625 11.0801L14.585 14.1035L15.7852 16.3604L18.7363 14.5723V25.4561H14.9209V28H25.3848V25.4561H21.8086V11.0801H19.625Z" fill="#FF97B8"/>
            </svg>`, // 1
            paragraph:
              "Implement security features such as multi-factor authentication for account sign-in and the use of a security key for creating and accessing the account from a new device.",
          },
          {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM19.1924 10.8398C18.1046 10.8399 17.0567 11.0237 16.0488 11.3916C15.0408 11.7596 14.2003 12.2484 13.5283 12.8564L14.5605 15.1602C15.2165 14.5682 15.8966 14.1363 16.6006 13.8643C17.3206 13.5763 18.0566 13.4317 18.8086 13.4316C19.7686 13.4316 20.4972 13.6397 20.9932 14.0557C21.5051 14.4716 21.7607 15.08 21.7607 15.8799C21.7607 16.2958 21.6889 16.712 21.5449 17.1279C21.401 17.5438 21.1769 17.9759 20.873 18.4238C20.585 18.8718 20.1923 19.3597 19.6963 19.8877L14.2246 25.7197V28H25.457V25.4561H18.0557L21.7852 21.5684C22.3131 21.0244 22.7609 20.5038 23.1289 20.0078C23.5128 19.4959 23.8245 18.9995 24.0645 18.5195C24.3203 18.0397 24.5042 17.5599 24.6162 17.0801C24.7442 16.5842 24.8086 16.0802 24.8086 15.5684C24.8086 14.5605 24.5931 13.704 24.1611 13C23.7291 12.296 23.0966 11.7596 22.2646 11.3916C21.4327 11.0237 20.4083 10.8398 19.1924 10.8398Z" fill="#FF97B8"/></svg>`, // 2
            paragraph:
              "Set up notifications to alert users about upcoming due dates and when they reach the spending limit within a specific category.",
          },
          {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM19.2168 10.8398C18.1288 10.8398 17.0803 11.0162 16.0723 11.3682C15.0645 11.7202 14.2246 12.2165 13.5527 12.8564L14.5605 15.1602C15.2165 14.5682 15.905 14.1363 16.625 13.8643C17.3449 13.5763 18.1212 13.4316 18.9531 13.4316C19.8808 13.4317 20.5845 13.624 21.0645 14.0078C21.5605 14.3918 21.8086 14.9525 21.8086 15.6885C21.8085 16.2163 21.6882 16.6643 21.4482 17.0322C21.2083 17.4001 20.8723 17.6886 20.4404 17.8965C20.0085 18.0883 19.4886 18.1836 18.8809 18.1836H16.457V20.7275H19.1689C20.1928 20.7276 20.9691 20.9282 21.4971 21.3281C22.0408 21.7121 22.3124 22.3039 22.3125 23.1035C22.3125 23.6475 22.1847 24.1121 21.9287 24.4961C21.6887 24.8801 21.3286 25.1684 20.8486 25.3604C20.3687 25.5523 19.7762 25.6484 19.0723 25.6484C18.1926 25.6484 17.3609 25.5121 16.5771 25.2402C15.7931 24.9682 15.0245 24.5438 14.2725 23.9678L13.2646 26.3203C13.7285 26.7202 14.2727 27.0636 14.8965 27.3516C15.5205 27.6396 16.1931 27.856 16.9131 28C17.649 28.1599 18.4011 28.2402 19.1689 28.2402C20.4328 28.2402 21.5207 28.048 22.4326 27.6641C23.3446 27.2641 24.0489 26.696 24.5449 25.96C25.0408 25.224 25.289 24.36 25.2891 23.3682C25.2891 22.6002 25.1444 21.9201 24.8564 21.3281C24.5684 20.7361 24.1524 20.2483 23.6084 19.8643C23.1978 19.5744 22.7237 19.3569 22.1855 19.2129C22.9062 18.9444 23.4934 18.524 23.9443 17.9443C24.5043 17.2084 24.7851 16.3361 24.7852 15.3281C24.7852 14.3841 24.5603 13.5837 24.1123 12.9277C23.6803 12.2559 23.0486 11.7435 22.2168 11.3916C21.3848 11.0236 20.3847 10.8399 19.2168 10.8398Z" fill="#FF97B8"/>`, // 3
            paragraph: "Conduct user testing of the hi-fi prototype.",
          },
        ],
      },
      // --- Case Study Navigation Data ---
      prevCaseStudy: {
        name: "Rabbitry Responsive Website",
        link: "/case-study/rabbitry",
        thumbnail: new URL("../assets/rabbitry-thumbnail.png", import.meta.url)
          .href,
      },
      nextCaseStudy: {
        name: "Real Estate Mobile App",
        link: "/case-study/real-estate",
        thumbnail: new URL(
          "../assets/realestate-thumbnail.png",
          import.meta.url
        ).href,
      },
    };
  },

  created() {
    this.currentDesignDecisionContent = this.designDecisions_Variation2;

    // Competitive audit content
    this.currentCompetitiveAuditContent = this.competitiveAudit_OnlyImage; // for Budgeting

    // Set the content for the Usability Study section
    this.currentUsabilityStudyContent = this.usabilityStudy_Variation2; // for Budgeting

    // Set the content for the Mockup Gallery section
    this.currentMockupGalleryContent = this.mockupGallery_Variation2; // for Budgeting

    // Prototype Link section
    this.currentPrototypeLinkContent = this.prototypeLink_Variation2;

    //  Accessibility section
    this.currentAccessibilityContent = this.accessibility_Variation1; //Budgeting

    //  Takeaways section
    this.currentTakeawaysContent = this.takeaways_Variation2; //Budgeting
  },
};
</script>

  <style scoped>
.case-wrapper {
  background: #f7f8f9;
}
</style>
