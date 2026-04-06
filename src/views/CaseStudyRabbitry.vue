<template>
  <section class="case-wrapper">
    <DescriptionSection
      :descriptionData="rabbitryDescriptionData"
      :prototypeLinks="currentPrototypeLinkContent.linkBlocks"
    />
    <OverviewSection :overviewContent="rabbitryOverviewContent" />
    <UserResearchSection :researchContent="rabbitryUserResearchContent" />
    <PersonasSection :personas="caseStudyPersonas" />
    <CompetitiveAuditSection :auditContent="currentCompetitiveAuditContent" />
    <DesignDecisionsSection :designContent="currentDesignDecisionContent" />
    <UsabilityStudySection :usabilityContent="currentUsabilityStudyContent" />
    <MockupGallery :galleryContent="currentMockupGalleryContent" />
    <PrototypeLink :linkContent="currentPrototypeLinkContent" />
    <ResponsiveDesignSection
      :responsiveContent="currentResponsiveDesignContent"
    />
    <DarkLightMode :darkLightContent="currentDarkLightModeContent" />
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
import UsabilityStudySection from "@/components/UsabilityStudySection.vue";
import MockupGallery from "@/components/MockupGallery.vue";
import ResponsiveDesignSection from "@/components/ResponsiveDesignSection.vue";
import DarkLightMode from "@/components/DarkLightMode.vue";
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
    UsabilityStudySection,
    MockupGallery,
    ResponsiveDesignSection,
    DarkLightMode,
    PrototypeLink,
    AccessibilitySection,
    TakeawaysSection,
    CaseStudyNav,
  },
  data() {
    return {
      // Data for the DescriptionSection
      rabbitryDescriptionData: {
        tableData: [
          {
            label: "Case Study",
            value: "Burrow Buddies Rabbitry Responsive Website",
          },
          { label: "Role", value: "UI/UX Designer" },
          { label: "Timeline", value: "July 2024" },
          { label: "Scope", value: "Responsive website design" },
          { label: "Tools", value: "Figma, Adobe Illustrator" },
          {
            label: "Responsibilities",
            value:
              "User research, competitive audit, IA, persona, user journey, wireframing, prototyping, micro interactions, UI, icons",
          },
        ],
        imageSrc: new URL("@/assets/rabbitry-description.png", import.meta.url)
          .href,
        imageAlt: "Rabbitry project mockups",
      },
      // Data for the Overview Section in Rabbitry
      rabbitryOverviewContent: {
        problem:
          "People need an easy-to-use website that provides all the necessary information to make informed decisions and simplifies the process of finding and purchasing a pet rabbit.",
        goal: "The aim is to design a comprehensive, user-friendly, and responsive website that streamlines the bunny adoption process and educates potential owners about proper bunny care. The site should provide detailed information on bunny care, ensuring prospective owners can afford the costs, choose a suitable pet, provide appropriate housing and diet, ensure compatibility with other pets or children, and learn more about rabbits' personalities.",
      },
      // Data for the User Research Section in Rabbitry
      rabbitryUserResearchContent: {
        introTitle: "User Research Insights",
        introParagraph:
          "For this project, I conducted a qualitative user research, and competitor analysis. Initially, I assumed that potential bunny owners were mainly concerned with the aesthetics of the rabbits and basic care information. However, the research revealed that users are deeply concerned about the long-term responsibilities, costs, and ethical breeding practices. This insight shifted my design focus towards providing comprehensive care guides, detailed cost breakdowns, and transparent breeder information to address these concerns effectively.",
        painPointsTitle: "User Pain Points",
        painPoints: [
          {
            number: 1,
            headline: "Rabbit Ownersip Cost",
            description:
              "Potential owners often feel uncertain about the long-term responsibilities and costs associated with owning a bunny, which can deter them from making a purchase.",
          },
          {
            number: 2,
            headline: "Breed Selection",
            description:
              "Potential owners often feel overwhelmed by the variety of bunny breeds and personalities, making it difficult to make an informed choice.",
          },
          {
            number: 3,
            headline: "Lack of knowledge",
            description:
              "Lack of knowledge about a bunnys diet and housing needs can lead to potential health risks for bunnies and stress for new owners.",
          },
          {
            number: 4,
            headline: "Order Management",
            description:
              "The order processing, from initial inquiry to final pick-up, involves multiple steps and communication between the buyer and seller, which can be complex and time-consuming.",
          },
        ],
      },
      // Data for the Personas Section
      caseStudyPersonas: [
        {
          name: "Buyer Persona",
          image: new URL("../assets/rabbitry-BuyerPersona.jpg", import.meta.url)
            .href,
          problemStatementHeading: "Problem Statement",
          problemStatementDescription:
            "Karen is a conscientious and detail-oriented individual considering bunny adoption. She needs comprehensive information on care to ensure she can afford the costs, choose a suitable pet, provide proper housing and diet, ensure compatibility with children or other pets, and find a responsible breeder.",
          journeyMapUrl: new URL(
            "../assets/rabbitry-BuyerUserJourney.jpg",
            import.meta.url
          ).href,
          empathyMapUrl: new URL(
            "../assets/rabbitry-BuyerEmpathyMap.jpg",
            import.meta.url
          ).href,
        },
        {
          name: "Seller Persona",
          image: new URL(
            "../assets/rabbitry-SellerPersona.jpg",
            import.meta.url
          ).href,
          problemStatementHeading: "Problem Statement",
          problemStatementDescription:
            "Alex, the owner of Bunny Rabbitry, is a detail-oriented breeder who needs a more efficient way to manage orders, educate customers, coordinate logistics, and maintain the website — because the current system is time-consuming, complex, and prone to errors.",
          journeyMapUrl: new URL(
            "../assets/rabbitry-SellerUserJourney.jpg",
            import.meta.url
          ).href,
          empathyMapUrl: new URL(
            "../assets/rabbitry-SellerEmpathyMap.jpg",
            import.meta.url
          ).href,
        },
      ],

      // --- Competitive Audit Content ---
      //Rabbitry Competitive Audit
      competitiveAudit_TwoNumberedLists: {
        paragraphs: [],
        lists: [
          {
            heading: "Competitor Strengths",
            numbered: true,
            items: [
              "Care Instructions: Some competitors offer care guides and instructions, which are very useful for prospective bunny owners.",
              "Organized Listings: A few websites have well-organized sections for available rabbits, including detailed information and appealing descriptions.",
              "Design and Layout: Some competitors have attractive website designs with easy-to-navigate layouts and professional photos enhance user experience.",
            ],
          },
          {
            heading: "Competitor Weaknesses",
            numbered: true,
            items: [
              "Payment and Price Information: None of the websites provide online payment options and automatic pick-up scheduling services. Some websites don’t have a clear price information.",
              "Care Guides: Several sites lack comprehensive care instructions, which are essential for educating new owners about proper rabbit care.",
              "Waitlist and Reservation Process: The process for joining waitlists or reserving bunnies is often cumbersome, requiring users to fill out long forms or make phone calls, which can be a deterrent.",
              "Content Accessibility: Information is sometimes poorly formatted or spread across multiple sections of the website, making it difficult for users to find what they need easily.",
            ],
          },
        ],
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },

      currentCompetitiveAuditContent: {
        paragraphs: [],
        lists: [],
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },

      // --- Design Decisions Content Variations ---
      designDecisions_Variation1: {
        sectionTitle: "Digital Wireframes & Key Features",
        paragraphs: [
          "My design decisions were guided by the design requirements that emerged from user and competitor research:",
          "Buyers' Needs. A user-friendly source of detailed bunny care information, clear price and payment options, and a streamlined purchasing process.",
          "Sellers' Needs. A well-organized, easy-to-update website with efficient order management and educational resources about proper bunny care.",
          "Based on these requirements, I created a website sitemap to visualize its information architecture. The IA of the website includes four sections that align with the steps in the buyer user journey:",
          "1.Are Bunnies for Me? Section. Helps prospective owners understand the level of care and financial commitment involved.",
          "2.Available Bunnies Section.  Allows users to choose a rabbit breed, view a gallery of available rabbits, or join a waitlist. Since selling rabbits is a primary goal of the site, I provided several ways to access the available rabbits' gallery and created a seamless payment and pick-up scheduling process for both buyers and sellers.",
          "3.Care Guide Section. Contains comprehensive care guides based on common buyer concerns and questions. The goals of this guide are to equip buyers with essential information about rabbit care, ease the selling process for the seller by addressing common rabbit care questions, and ensure the rabbits' well-being.",
          "4.Rabbit Behavior Descriptions. Introduces the rabbits' personalities in a fun and engaging way to help buyers understand their future pets better and fall in love with them.",
          "5.Contact Page. Includes the rabbitry’s physical address, phone number, email address, an embedded map for easy location, and social media links.",
          "By structuring the website in this way, I aimed to create a seamless and informative experience that meets the needs of both buyers and sellers.",
        ],
        flexibleContentBlocks: [
          {
            imageUrl: new URL(
              "../assets/paper-wireframes-rabbitry.png",
              import.meta.url
            ).href,
            imageAlt: "Paper Wireframes displaying the app's structure",
            heading: "Paper Wireframes",
            text: "I wanted for the landing page to:",
            listItems: [
              "Introduce the business concisely, emphasizing its reputation and ethical breeding",
              "Draw the most attention to the available rabbits section",
              "Be easy to use on mobile devices",
              "Be clean and uncluttered",
              "Load quickly.",
            ],
          },
        ],
        bigImage: {
          imageUrl: new URL("../assets/lo-fi-rabbitry.png", import.meta.url)
            .href,
          imageAlt: "Overview of multiple Lo-fi wireframe screens",
          caption: "Overview of the initial wireframe flow.",
        },
        prototypeLink: {
          heading: "Ready to see it in action?",
          url: "https://tinyurl.com/4pzd8xad",
        },
        featureHighlights: [
          {
            imageUrl: new URL(
              "../assets/rabbit-cost-lo-fi.png",
              import.meta.url
            ).href,
            imageAlt: "Wireframe detail: Navigation Menu",
            description:
              "Mobile-friendly infographics that shows rabbit ownership costs",
          },
          {
            imageUrl: new URL(
              "../assets/rabbit-payment-lo-fi.png",
              import.meta.url
            ).href,
            imageAlt: "Wireframe detail: Data Input Form",
            description: "Allows users to choose a payment method and amount",
          },
          {
            imageUrl: new URL(
              "../assets/rabbit-pick-up-lo-fi.png",
              import.meta.url
            ).href,
            imageAlt: "Wireframe detail: Progress Tracker",
            description:
              "Calendar shows available pickup days. The dial time picker displays all available pickup times",
          },
          /* {
              imageUrl: new URL('../assets/wireframe-solution.png', import.meta.url).href, 
              imageAlt: 'Wireframe detail: Notifications',
              description: 'Contextual notifications for important updates.',
              
            } */
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

      // --- Usability Study Content Variation1 for Rabbitry ---
      usabilityStudy_Variation1: {
        sectionTitle: "Usability Study Findings",
        introParagraph:
          "I conducted unmoderated and moderated usability studies to test low and hi fidelity prototypes.",
        type: "two-column-lists",
        lists: [
          {
            heading: "Findings (Lo-fi prototype testing)",
            items: [
              "The homepage should clearly show where the rabbitry is located.",
              "Users want to see recommended rabbit care products.",
            ],
          },
          {
            heading: "Findings (Hi-fi prototype testing)",
            items: [
              "Several participants struggled to distinguish between AM and PM options in the time picker interface.",
              "The extended FAB meant to show recommended product information wasn’t noticeable enough to users.",
              "The carousel in the rabbit image gallery wasn’t visually identifiable as a carousel.",
            ],
          },
        ],
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

      // --- Mockup Gallery Content Variation1 Rabbitry---
      mockupGallery_Variation1: {
        sectionTitle: "Mockups",
        introParagraph:
          "This gallery showcases the high-fidelity mockups, demonstrating the visual design and user interface of the application.",
        type: "text-images-grid-and-bottom-image",
        sections: [
          {
            textBlock: {
              heading: "Carousel Controls",
              paragraphs: [
                "The carousel in the rabbit image gallery lacked clear visual cues to indicate it was interactive. To address this, I added indicators to show that the element can be dragged to reveal more images and to highlight which image is currently active. Additionally, arrow controls were introduced to allow users to tap through the images, making navigation more intuitive.",
              ],
            },
            images: [
              {
                heading: "Before",
                imageUrl: new URL(
                  "../assets/mockup-rabbitry-0.png",
                  import.meta.url
                ).href,
                imageAlt: "Gallery Mockup Before Usability Study",
                imageCaption: "Carousel controlls before usability study.",
              },
              {
                heading: "After",
                imageUrl: new URL(
                  "../assets/mockup-rabbitry-1.png",
                  import.meta.url
                ).href,
                imageAlt: "Gallery Mockup Redesigned After Usability Study",
                imageCaption: "Dot page indicator and double arrows added",
              },
            ],
          },
          {
            textBlock: {
              heading:
                "Improving Time Selection: Usability and Accessibility Enhancements",
              paragraphs: [
                "In the second usability study, some participants struggled to distinguish between AM and PM times.",
                "To address this, I set out to redesign the time picker with a focus on clarity, usability, and accessibility. The revised design meets the following requirements:",
              ],

              listItems: [
                "The dial time picker displays only available pick-up times during business hours.",
                "IUsers can select a time by tapping a number, dragging the dial selector, or using the keyboard, offering multiple input methods and enhancing accessibility.",
                "When navigating with a keyboard, focus automatically lands on the first available (non-disabled) time slot.",
                "The interactive area of the dial picker is at least 48px, ensuring it meets accessibility touch target guidelines.",
                "For screen reader users, the dial picker announces selections with contextual information, such as: “Hour 7 of 12.",
              ],
            },
            images: [
              {
                heading: "Before",
                imageUrl: new URL(
                  "../assets/mockup-rabbitry-2.png",
                  import.meta.url
                ).href,
                imageAlt: "Time Picker Mockup Before Usability Study",
              },
              {
                heading: "After",
                imageUrl: new URL(
                  "../assets/mockup-rabbitry-3.png",
                  import.meta.url
                ).href,
                imageAlt: "Time Picker Mockup After the Redesign",
              },
            ],
          },
          {
            textBlock: {
              heading:
                "Improving Visibility of the Extended FAB for Recommended Products",
              paragraphs: [
                "To maintain continuous access to additional resources without overlapping page content, I placed an extended Floating Action Button (FAB) above the long-scrolling surface content. This FAB was designed to emphasize and provide quick access to recommended product information. However, in the second usability study, some users did not notice the FAB, resulting in missed content. To improve visibility and interaction, I added an arrow icon to the FAB, making its purpose and interactivity more apparent.",
                "Accessibility Consideration:",
                "The FAB includes an accessibility label that matches the visible label, “Recommended products,” and its role is defined as Button, ensuring compatibility with screen readers and assistive technologies.",
              ],
            },
            images: [
              {
                heading: "Before",
                imageUrl: new URL(
                  "../assets/mockup-rabbitry-4.png",
                  import.meta.url
                ).href,
                imageAlt:
                  "Educational Page Mockup with FAB before the usability study",
              },
              {
                heading: "After",
                imageUrl: new URL(
                  "../assets/mockup-rabbitry-5.png",
                  import.meta.url
                ).href,
                imageAlt:
                  "Educational Page Mockup with FAB after the usability study",
              },
            ],
          },
        ],
        bottomImage: {
          imageUrl: new URL("../assets/mockup-rabbitry-6.jpg", import.meta.url)
            .href,
          imageAlt: "High-fidelity mockups of the final design",
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
      // Data for the Responsive Design Section
      responsiveDesignContent: {
        sectionTitle: "Responsive Design",
        imageUrl: new URL("../assets/responsive-rabbitry.png", import.meta.url)
          .href,
        imageAlt: "Responsive design showcase across devices",
        imageCaption:
          "The design adapts seamlessly to various screen sizes, from mobile to desktop.",
      },
      // Data for the Dark/Light Mode Section
      darkLightModeContent: {
        sectionTitle: "Dark & Light Mode",
        paragraph:
          "The application offers both dark and light mode themes, providing users with flexibility to choose their preferred visual experience. I implemented dark mode using variables. Additionally, I created style tokens in Figma, enabling quick and consistent visual design adjustments across the entire product.",
        images: [
          {
            imageUrl: new URL(
              "../assets/light-mode-rabbitry.webp",
              import.meta.url
            ).href, // Placeholder for light mode image
            imageAlt: "Light mode interface mockup",
          },
          {
            imageUrl: new URL(
              "../assets/dark-mode-rabbitry.webp",
              import.meta.url
            ).href, // Placeholder for dark mode image
            imageAlt: "Dark mode interface mockup",
          },
        ],
      },

      //Prototype Link Rabbitry Section Data
      prototypeLink_Variation1: {
        sectionTitle: "High-fidelity prototype",
        linkBlocks: [
          {
            heading: "Figma Link",
            url: "https://tinyurl.com/3aub2vc4",
            linkText: "View Hi-Fi Prototype",
          },

          // Video Walkthrough
          {
            heading: "Video Link",
            url: "https://youtu.be/-bLWQ3msAq0",
            linkText: "View Walkthrough",
          },
        ],
        imageUrl: new URL("../assets/figma-rabbitry.png", import.meta.url).href,
        imageAlt:
          "The screenshot of the Figma prototype view of the rabbitry app",
        imageCaption: "Interactive prototype showcasing key user flows.",
      },

      currentPrototypeLinkContent: {
        sectionTitle: "High-fidelity prototype",
        linkBlocks: [],
        imageUrl: "",
        imageAlt: "",
        imageCaption: "",
      },

      // --- Accessibility Section Content Rabbitry Variation3 ---

      accessibility_Variation3: {
        sectionTitle: "Accessibility Considerations",
        type: "four-columns-mixed",
        columns: [
          {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM19.625 11.0801L14.585 14.1035L15.7852 16.3604L18.7363 14.5723V25.4561H14.9209V28H25.3848V25.4561H21.8086V11.0801H19.625Z" fill="#FF97B8"/>
            </svg>`,
            paragraph: "All texts meet AA or AAA color contrast requirements.",
            modalImageUrl: new URL(
              "../assets/contrast-ratio-text.png",
              import.meta.url
            ).href,
            modalImageAlt: "Color Contrast Compliance Level",
          },
          {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM19.1924 10.8398C18.1046 10.8399 17.0567 11.0237 16.0488 11.3916C15.0408 11.7596 14.2003 12.2484 13.5283 12.8564L14.5605 15.1602C15.2165 14.5682 15.8966 14.1363 16.6006 13.8643C17.3206 13.5763 18.0566 13.4317 18.8086 13.4316C19.7686 13.4316 20.4972 13.6397 20.9932 14.0557C21.5051 14.4716 21.7607 15.08 21.7607 15.8799C21.7607 16.2958 21.6889 16.712 21.5449 17.1279C21.401 17.5438 21.1769 17.9759 20.873 18.4238C20.585 18.8718 20.1923 19.3597 19.6963 19.8877L14.2246 25.7197V28H25.457V25.4561H18.0557L21.7852 21.5684C22.3131 21.0244 22.7609 20.5038 23.1289 20.0078C23.5128 19.4959 23.8245 18.9995 24.0645 18.5195C24.3203 18.0397 24.5042 17.5599 24.6162 17.0801C24.7442 16.5842 24.8086 16.0802 24.8086 15.5684C24.8086 14.5605 24.5931 13.704 24.1611 13C23.7291 12.296 23.0966 11.7596 22.2646 11.3916C21.4327 11.0237 20.4083 10.8398 19.1924 10.8398Z" fill="#FF97B8"/>
            </svg>`,
            paragraph:
              "The focus and hover states maintain a minimum color contrast ratio of 3:1 compared to their unfocused state, ensuring better visibility and accessibility.",
            imageUrl: new URL(
              "../assets/contrast-ratio-state.png",
              import.meta.url
            ).href, // Small image
            imageAlt: "Example of simplified interface",
          },
          {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM19.2168 10.8398C18.1288 10.8398 17.0803 11.0162 16.0723 11.3682C15.0645 11.7202 14.2246 12.2165 13.5527 12.8564L14.5605 15.1602C15.2165 14.5682 15.905 14.1363 16.625 13.8643C17.3449 13.5763 18.1212 13.4316 18.9531 13.4316C19.8808 13.4317 20.5845 13.624 21.0645 14.0078C21.5605 14.3918 21.8086 14.9525 21.8086 15.6885C21.8085 16.2163 21.6882 16.6643 21.4482 17.0322C21.2083 17.4001 20.8723 17.6886 20.4404 17.8965C20.0085 18.0883 19.4886 18.1836 18.8809 18.1836H16.457V20.7275H19.1689C20.1928 20.7276 20.9691 20.9282 21.4971 21.3281C22.0408 21.7121 22.3124 22.3039 22.3125 23.1035C22.3125 23.6475 22.1847 24.1121 21.9287 24.4961C21.6887 24.8801 21.3286 25.1684 20.8486 25.3604C20.3687 25.5523 19.7762 25.6484 19.0723 25.6484C18.1926 25.6484 17.3609 25.5121 16.5771 25.2402C15.7931 24.9682 15.0245 24.5438 14.2725 23.9678L13.2646 26.3203C13.7285 26.7202 14.2727 27.0636 14.8965 27.3516C15.5205 27.6396 16.1931 27.856 16.9131 28C17.649 28.1599 18.4011 28.2402 19.1689 28.2402C20.4328 28.2402 21.5207 28.048 22.4326 27.6641C23.3446 27.2641 24.0489 26.696 24.5449 25.96C25.0408 25.224 25.289 24.36 25.2891 23.3682C25.2891 22.6002 25.1444 21.9201 24.8564 21.3281C24.5684 20.7361 24.1524 20.2483 23.6084 19.8643C23.1978 19.5744 22.7237 19.3569 22.1855 19.2129C22.9062 18.9444 23.4934 18.524 23.9443 17.9443C24.5043 17.2084 24.7851 16.3361 24.7852 15.3281C24.7852 14.3841 24.5603 13.5837 24.1123 12.9277C23.6803 12.2559 23.0486 11.7435 22.2168 11.3916C21.3848 11.0236 20.3847 10.8399 19.2168 10.8398Z" fill="#FF97B8"/>
            </svg>`,
            paragraph1:
              "Interactive elements include clear, descriptive accessibility labels and support keyboard navigation. ",
            paragraph2:
              "Section headings accurately reflect the topic or purpose of the content that follows.",
          },
          {
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0ZM21.209 11.0801L13.3125 22.5283V24.7842H20.6807V28H23.7529V24.7842H26.1289V22.2402H23.7529V11.0801H21.209ZM20.6807 22.2402H16.2695L20.6807 15.7725V22.2402Z" fill="#FF97B8"/>
            </svg>`,
            paragraph:
              "All tappable elements have a minimum touch target size of 48px to ensure ease of use and accessibility.",
          },
        ],
      },
      currentAccessibilityContent: {
        sectionTitle: "Accessibility",
        introParagraph: "",
        type: "default", // This will be set in created()
        columns: [],
      },

      // --- Takeaways Section Content Variation1 Rabbitry ---
      takeaways_Variation1: {
        sectionTitle: "Key Takeaways",
        type: "two-columns-simple",
        columns: [
          {
            heading: "What I learned:",
            paragraph1:
              "I gained valuable insights into crafting a seamless user experience by addressing the needs of both buyers and sellers—from detailed care guides to streamlined order management. Additionally, I enhanced my understanding of accessibility best practices to ensure the website is inclusive and user-friendly for all users.",
            paragraph2:
              "Finalize the design style guide for developers, including clear instructions on managing responsive elements and ensuring a consistent, user-friendly experience across all device types.",
          },
          {
            heading: "Next Steps",
            paragraph1:
              "Conduct usability testing with a diverse group of users to identify any remaining pain points or areas for improvement.",
            paragraph2:
              "Finalize the design style guide for developers, including clear instructions on managing responsive elements and ensuring a consistent, user-friendly experience across all device types.",
          },
        ],
      },

      currentTakeawaysContent: {
        sectionTitle: "Takeaways & Next Steps",
        type: "default",
        columns: [],
        nextStepsHeading: "",
        takeawaysSection: {},
        nextStepsSection: {},
        keyTakeaways: {},
        furtherImprovement: {},
        summaryHeading: "",
        paragraphs: [],
      },
      // --- Case Study Navigation Data ---
      prevCaseStudy: {
        name: "Vacation Planner App",
        link: "/case-study/vacation", // case study link
        thumbnail: new URL("../assets/vacation-thumbnail.png", import.meta.url)
          .href,
      },
      nextCaseStudy: {
        name: "Budgeting App and Website",
        link: "/case-study/budgeting", // case study link
        thumbnail: new URL("../assets/budgeting-thumbnail.png", import.meta.url)
          .href,
      },
    };
  },

  created() {
    //Design decisions
    this.currentDesignDecisionContent = this.designDecisions_Variation1;

    // Competitive audit content
    this.currentCompetitiveAuditContent =
      this.competitiveAudit_TwoNumberedLists; //  for Rabbitry

    // The content for the Usability Study section
    this.currentUsabilityStudyContent = this.usabilityStudy_Variation1; // for Rabbitry

    // The content for the Mockup Gallery section
    this.currentMockupGalleryContent = this.mockupGallery_Variation1; //  for Rabbitry

    // Responsive Design section
    this.currentResponsiveDesignContent = this.responsiveDesignContent;

    // Dark/Light Mode section
    this.currentDarkLightModeContent = this.darkLightModeContent;

    // Prototype Link section
    this.currentPrototypeLinkContent = this.prototypeLink_Variation1; // Rabbitry

    //  Accessibility section
    this.currentAccessibilityContent = this.accessibility_Variation3; // Rabbitry

    //  Takeaways section
    this.currentTakeawaysContent = this.takeaways_Variation1; //Rabbitry
  },
};
</script>

  <style scoped>
.case-wrapper {
  background: #f7f8f9;
}
</style>
