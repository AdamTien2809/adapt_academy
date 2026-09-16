/**
 * ADAPT ACADEMY - COURSE DATA STORE
 * ============================================================================
 * Central repository for all course content:
 * - Module Information & "What You Will Learn" outcomes
 * - Video lessons (labeled 1.1, 1.2, 1.3, etc.)
 * - Module practice quizzes (questions, choices, explanations, correct answers)
 * - Final Assessment (solely questions & answers, >80% required to pass)
 * 
 * 💡 NOTE FOR USER:
 * You can easily insert, update, or replace any video URL, question, choice,
 * explanation, or answer by editing this file directly!
 * ============================================================================
 */

window.courseData = {
  courseTitle: "ADAPT Academy",
  courseSubtitle: "From SOP to Smart Decisions",
  organization: "AES Mong Duong",
  passingThreshold: 80, // Requires > 80% to pass the final assessment

  // ==========================================================================
  // MODULES DATA
  // ==========================================================================
  modulesData: {
    // ------------------------------------------------------------------------
    // MODULE 1: THEORY REVIEW
    // ------------------------------------------------------------------------
    module1: {
      id: "module1",
      number: 1,
      code: "1.0",
      badge: "MODULE 1",
      title: "Theory Review & Foundations",
      subtitle: "Master the core principles of adaptive operational thinking and SOP integration.",
      estimatedTime: "8 – 10 minutes",
      learningMode: "Theory Review",
      role: "O&M Engineer",
      bannerImage: "assets/plant_hero_banner.jpg",
      
      mission: {
        title: "YOUR MISSION",
        description: "Explore the foundational principles of the ADAPT framework at AES Mong Duong. Understand how to bridge standard operating procedures with smart, real-time operational decisions when unexpected conditions arise."
      },

      // "What you will learn upon completing these lessons"
      learningOutcomes: [
        {
          icon: "shield-check",
          title: "Adaptive Safety Culture",
          desc: "Understand how to maintain strict safety standards while adapting to dynamic plant conditions."
        },
        {
          icon: "cpu-chip",
          title: "5 Pillars of ADAPT",
          desc: "Master the Assess, Decide, Act, Pause, and Track & Transfer operational cycle."
        },
        {
          icon: "arrows-pointing-out",
          title: "Escaping the Compliance Trap",
          desc: "Recognize when blindly following an outdated procedure introduces operational risk."
        },
        {
          icon: "user-group",
          title: "Cross-Functional Synergy",
          desc: "Establish clear communication protocols between DCS Operators, SCM, and Maintenance."
        }
      ],

      // Three videos labeled 1.1, 1.2, and 1.3
      videos: [
        {
          id: "1.1",
          label: "Lesson 1.1",
          title: "Video 1.1: From Knowledge to Performance",
          duration: "07:30",
          videoUrl: "https://youtu.be/pLsWd1wgtw0",
          overview: "Examines the transition from passive 'Wait-for-Alarm' compliance (LTEM Level 4) to proactive operational judgment (LTEM Level 7). Follows a CCR operator encountering a subtle ID Fan bearing temperature drift.",
          keyPoints: [
            "Differentiating LTEM Level 4 (static exam recall) from Level 7 (dynamic transfer decision-making)",
            "Avoiding the 'Wait-for-Alarm Syndrome' when parameters trend upward within green limits",
            "Establishing digital shift logs and a mandatory 15-minute dedicated cross-shift monitoring protocol"
          ]
        },
        {
          id: "1.2",
          label: "Lesson 1.2",
          title: "Video 1.2: From Local Optimisation to System Thinking",
          duration: "08:15",
          videoUrl: "https://youtu.be/51RdStHlC-A",
          overview: "Analyzes the 5 Whys Root Cause Analysis of outage equipment handover delays, exposing the dangers of the 'Local Optimization Trap' and enforcing the mandatory G-72 Hours SCM prioritization rule.",
          keyPoints: [
            "Applying 5 Whys RCA to identify cross-functional handoff bottlenecks between Operations & SCM",
            "Escaping the 'Local Optimization Trap' that blinds engineers to procurement and customs lead times",
            "Enforcing the 'G - 72 Hours' rule and priority tiering (Critical Path / High Risk vs Low Risk)"
          ]
        },
        {
          id: "1.3",
          label: "Lesson 1.3",
          title: "Video 1.3: Clear Data and Safe Handover",
          duration: "06:40",
          videoUrl: "https://youtu.be/JWSRGE6MmtE",
          overview: "Focuses on the three foundational pillars of data integrity: Standard KKS asset tags, standard SI units (bar/°C), and real-time timestamping, combined with the 3-step safe handover framework.",
          keyPoints: [
            "The 3-Step Handover Protocol: State condition, Set the safety limit, and Offer a collaborative solution"
          ]
        }
      ],

      // Module Practice Quiz (15 scenario cases across Video 1.1, 1.2, 1.3)
      quiz: [
        // ====================================================================
        // VIDEO 1.1 CASES (1 – 5)
        // ====================================================================
        {
          id: "m1_q1",
          number: 1,
          lessonId: "1.1",
          lessonLabel: "Video 1.1",
          caseTitle: "Case 1: ID Fan Bearing Temperature Drift",
          scenario: "During Shift 1 (06:00 – 14:00), the DCS trend line indicates that the Induced Draft (ID) Fan bearing temperature has steadily risen from 62°C to 73°C over a 4-hour window. The standard SOP defines a yellow warning threshold (Alarm) at 75°C and an automated trip threshold at 85°C. With only 25 minutes remaining in your shift, the reading is still in the \"green zone\" and no alarm has sounded. As the CCR console operator, what is your best course of action?",
          question: "As the CCR console operator, what is your best course of action?",
          choices: [
            { id: "A", text: "Take no action and log nothing since the parameter has not breached 75°C; let the incoming shift observe it on their own." },
            { id: "B", text: "Give a quick verbal handover while shaking hands: \"The ID fan seemed slightly warmer than usual today\"." },
            { id: "C", text: "Export the temperature trend curve, cross-check mechanical vibration and lube oil levels, log the drift in the Digital Shift Logbook, and require the incoming Shift Supervisor to sign off on a 15-minute dedicated monitoring protocol." },
            { id: "D", text: "Hit the emergency load reduction button immediately to protect the fan bearing." }
          ],
          correctAnswer: "C",
          explanation: "Why C is correct: This exemplifies LTEM Level 7 (Transfer Decision-Making). You avoid the \"Wait-for-Alarm Syndrome\", analyze dynamic operational trends, document objective data, and establish a cross-shift protective handoff.\n\n• Why A is incorrect: Trapped in Level 4 (\"Wait-for-Alarm Syndrome\"). Waiting until the parameter hits 75°C can cause mechanical failure or an unexpected unit trip during the next shift.\n• Why B is incorrect: Verbal handovers lack quantitative data, get lost in shift-change noise, and provide no traceable engineering accountability.\n• Why D is incorrect: An overreaction without validating correlating metrics (vibration, oil levels); emergency de-rating causes unwarranted generation losses."
        },
        {
          id: "m1_q2",
          number: 2,
          lessonId: "1.1",
          lessonLabel: "Video 1.1",
          caseTitle: "Case 2: Post-Incident Dispute on Furnace Pressure Fluctuation",
          scenario: "Early into the night shift, furnace pressure fluctuates wildly, tripping a primary air fan. During the post-event review, the previous shift operator defends himself: \"When I was on duty, the parameter was inside limits. The 200-page SOP never states I must de-rate the boiler when pressure drifts by just 2%. I followed every single letter of the SOP!\"",
          question: "How would you evaluate this operator's mindset from a competency standpoint?",
          choices: [
            { id: "A", text: "The operator is correct; in thermal power operations, adhering strictly to written SOPs without deviation is the absolute standard." },
            { id: "B", text: "The operator is trapped in \"Process-Defensive Mindset\" (Level 4), treating the SOP as a shield to deflect accountability instead of identifying emerging risks to safeguard downstream operations." },
            { id: "C", text: "The operator has demonstrated Level 7 competency because he adhered to static compliance rules." },
            { id: "D", text: "The fault lies entirely with the Shift Supervisor for failing to stand directly behind the operator throughout the shift." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Saying \"I followed every single letter of the SOP\" is a hallmark of procedural defensiveness. In a 24/7 operating environment, following SOPs is merely a necessary condition; actively safeguarding downstream shifts is the sufficient condition.\n\n• Why A is incorrect: SOPs cover baseline and standardized conditions, not every dynamic fluctuation; dogmatic reliance on text paralyses field reflexes.\n• Why C is incorrect: Level 7 requires autonomous decision-making in ambiguous conditions, not hiding behind static exam knowledge (Level 4).\n• Why D is incorrect: Engineers with 10–15 years of operational tenure must maintain behavioral autonomy rather than relying on constant micro-supervision."
        },
        {
          id: "m1_q3",
          number: 3,
          lessonId: "1.1",
          lessonLabel: "Video 1.1",
          caseTitle: "Case 3: The Gap Between SOP Sát Hạch Scores and Workday Mid-Year Reviews",
          scenario: "Engineer Nam scored a perfect 100/100 on his standard safety exam and demonstrated superior general intelligence (GIA). However, at the Workday Mid-Year Touch Point, his manager categorized him as \"Developing\". Nam files a grievance claiming the review is biased.",
          question: "If you were the L&D Director or Shift Manager explaining this to Nam, what is the most legitimate rationale?",
          choices: [
            { id: "A", text: "Nam failed to meet minimum attendance hours (LTEM Level 1) during virtual learning modules." },
            { id: "B", text: "Static compliance tests evaluate only short-term knowledge retention (Level 4), whereas real-world operations require autonomous judgment under volatile conditions and seamless cross-functional handovers (Level 7), which Nam struggled to demonstrate." },
            { id: "C", text: "Workday quotas mandate that 10–15% of personnel be classified as \"Developing\" regardless of performance." },
            { id: "D", text: "Nam failed to participate actively in post-class group activities (LTEM Level 2)." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: This is the core CCR performance paradox: Recalling static SOP text (Level 4) does not translate into executing actions under dynamic pressure and operational ambiguity (Level 7).\n\n• Why A is incorrect: Level 1 is mere attendance; Nam passed the written exam with a perfect score, proving he was present and absorbed the material.\n• Why C is incorrect: Performance ratings stem from demonstrable gaps in operational autonomy, not arbitrary curve-fitting.\n• Why D is incorrect: Level 2 (Activity) measures classroom engagement, which does not address the gap between static testing and field execution on a 1,242 MW unit."
        },
        {
          id: "m1_q4",
          number: 4,
          lessonId: "1.1",
          lessonLabel: "Video 1.1",
          caseTitle: "Case 4: Coal Mill Lube Oil Level Drop Before Shift Handover",
          scenario: "30 minutes before your night shift ends, you notice the lube oil level of Coal Mill A has dropped 5% over the past 6 hours. The level remains in the green band, the mill runs smoothly, and the incoming shift is entering the CCR briefing room.",
          question: "Which action reflects the principle: \"Following SOP is necessary; safeguarding the next shift is sufficient\"?",
          choices: [
            { id: "A", text: "Shut down Coal Mill A immediately and start standby Mill B to eliminate personal liability." },
            { id: "B", text: "Ignore it because a 5% decrease across 6 hours is minor; maintenance will catch it on morning rounds." },
            { id: "C", text: "Verify oil pressure and bearing vibration, enter a flag into the digital logbook, and walk the incoming engineer through the specific trend during physical handover." },
            { id: "D", text: "Send a private text message to a friend on the incoming shift and clock out on time." }
          ],
          correctAnswer: "C",
          explanation: "Why C is correct: Verifies secondary physical indicators (vibration, pressure), logs the anomaly in the official digital system, and ensures a transparent, face-to-face handover.\n\n• Why A is incorrect: Tripping an essential auxiliary without emergency grounds disrupts combustion stability and unit output.\n• Why B is incorrect: Demonstrates localized complacency (\"as long as nothing happens on my watch\").\n• Why D is incorrect: Informal text messages bypass official plant logging, risking loss of critical operational traceability."
        },
        {
          id: "m1_q5",
          number: 5,
          lessonId: "1.1",
          lessonLabel: "Video 1.1",
          caseTitle: "Case 5: Ambiguity Under Outage Countdown Pressure",
          scenario: "On Day 3 of a 25-day critical outage window, countdown timers are ticking. Cooling steam flow shows slight irregular oscillations, yet no DCS alarm has triggered. The maintenance crew is stepping forward to unbolt the main isolation valve.",
          question: "Operating at LTEM Level 7, what should the CCR engineer prioritize?",
          choices: [
            { id: "A", text: "Stay silent so maintenance proceeds on schedule without compromising the Outage critical path." },
            { id: "B", text: "Halt the maintenance crew's valve operation for 5 minutes, actively verify field temperature and pressure trends, and reconfirm safe isolation boundaries before signing off." },
            { id: "C", text: "Flip through the 200-page SOP manual from cover to cover until an exact matching condition is found in text." },
            { id: "D", text: "Sign the Permit to Work (PTW) immediately because the isolation paperwork was authorized yesterday." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Level 7 represents sound decision-making amid time constraints and ambiguity. Pausing for 5 minutes prevents potential steam burns or catastrophic energy release during unbolting.\n\n• Why A is incorrect: Schedule adherence is critical, but life safety and system integrity always take precedence over speed.\n• Why C is incorrect: Demonstrates dogmatic procedural dependency; real-time operational risk calls for active diagnostics, not rote textbook reading.\n• Why D is incorrect: Yesterday's sign-off cannot verify dynamic physical parameters right at the moment of mechanical handover."
        },

        // ====================================================================
        // VIDEO 1.2 CASES (6 – 10)
        // ====================================================================
        {
          id: "m1_q6",
          number: 6,
          lessonId: "1.2",
          lessonLabel: "Video 1.2",
          caseTitle: "Case 1: Submitting the Outage Material Requisition",
          scenario: "Ahead of a major boiler overhaul, Operations Engineer Tuan compiles a list of 45 spare part items. Preoccupied with combustion parameters, Tuan merges all 45 items into a single unsorted Excel sheet and emails it to Supply Chain (SCM) just 4 hours before the scheduled shutdown without priority tags.",
          question: "According to the Root Cause Analysis (RCA), what was Tuan's fundamental error?",
          choices: [
            { id: "A", text: "He used an unapproved font style on the SCM requisition template." },
            { id: "B", text: "He fell into the \"Local Optimization Trap\" — focusing solely on closing valves in the CCR while completely ignoring the procurement lead times of downstream SCM teams." },
            { id: "C", text: "He did not personally drive to local hardware vendors to buy the 45 spare parts himself." },
            { id: "D", text: "He requested too many spare items, exceeding warehouse storage footprint." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: This matches the root cause (Why 5) from the RCA report: The engineer completed his isolated operational task but crippled SCM by leaving no time for customs processing and staging.\n\n• Why A is incorrect: Document formatting is not the systemic root cause of a 6-hour equipment handover delay.\n• Why C is incorrect: SCM owns procurement; operational engineers must interface through planning, not ad-hoc individual sourcing.\n• Why D is incorrect: The issue was not the volume of 45 items, but the late, batched submission lacking priority tiering."
        },
        {
          id: "m1_q7",
          number: 7,
          lessonId: "1.2",
          lessonLabel: "Video 1.2",
          caseTitle: "Case 2: Applying the 5 Whys to the Missing Valve Incident",
          scenario: "During a major outage, contractors were stalled for 6 hours due to a missing high-pressure bypass valve. SCM reported that the valve was held up in customs clearance following an urgent supplemental shipment.",
          question: "In the 5 Whys analysis, which link uncovers the direct cross-functional breakdown between Operations and SCM?",
          choices: [
            { id: "A", text: "Customs offices declined to process documentation over the weekend." },
            { id: "B", text: "Stevedores at the seaport misplaced the cargo container." },
            { id: "C", text: "Operations failed to flag this specific valve as a \"Critical Path\" item early on, preventing SCM from initiating emergency customs clearance ahead of time." },
            { id: "D", text: "International contractors demanded non-standard equipment unavailable in the domestic market." }
          ],
          correctAnswer: "C",
          explanation: "Why C is correct: Tracing back through the 5 Whys: customs was delayed because SCM filed an emergency request too late, and SCM filed late because Operations never flagged the valve as a Critical Path component.\n\n• Why A & B are incorrect: External excuses that deflect from the internal procedural failure uncovered in the RCA.\n• Why D is incorrect: The valve was standard specification; the failure was procurement timeline coordination, not component engineering."
        },
        {
          id: "m1_q8",
          number: 8,
          lessonId: "1.2",
          lessonLabel: "Video 1.2",
          caseTitle: "Case 3: Priority Tagging on the Material Planning Dashboard",
          scenario: "You are reviewing the Material Planning Dashboard for the upcoming outage:\nItem 1: High-Pressure Gasket – Required Day 5, Lead Time: 30 days, Local Stock: Out of Stock.\nItem 2: Portable Work Lights – Required Day 1, Lead Time: Same day, Local Stock: Available.\nItem 3: Torque Wrench Set – Required Day 8, Lead Time: 2 days, Local Stock: Available locally.",
          question: "Which tagging action is REQUIRED to safeguard the outage critical path?",
          choices: [
            { id: "A", text: "Tag Portable Work Lights as Critical Path because they are needed on Day 1." },
            { id: "B", text: "Tag the High-Pressure Gasket as \"High Risk / Critical Path\" to trigger immediate procurement at least 72 hours before Hour G, while keeping Work Lights as Low Risk." },
            { id: "C", text: "Wait until Day 4 of the outage to check whether the High-Pressure Gasket has arrived." },
            { id: "D", text: "Consolidate all three items into a standard unprioritized batch request for SCM to sort out." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: The High-Pressure Gasket has a 30-day lead time with no local inventory, needed by Day 5. It is an immediate project-halting bottleneck and must be tagged Critical Path at least 72 hours prior to shutdown.\n\n• Why A is incorrect: Work lights are needed Day 1 but have zero lead time and are in stock locally (Low Risk).\n• Why C is incorrect: Waiting until Day 4 guarantees an outage delay given the 30-day lead time.\n• Why D is incorrect: Batching unranked items repeats the failure detailed in the RCA report."
        },
        {
          id: "m1_q9",
          number: 9,
          lessonId: "1.2",
          lessonLabel: "Video 1.2",
          caseTitle: "Case 4: Quantifying the Impact of a 1-Hour Handover Delay",
          scenario: "A specialized team of 5 international turbine contractors is staged on site. Operations delays equipment handover by 2 hours due to uncoordinated critical path staging.",
          question: "What is the true downstream financial consequence of this delay?",
          choices: [
            { id: "A", text: "The plant only pays minor overtime wages to the 5 internal shift operators." },
            { id: "B", text: "Financial impact is negligible because the plant is already in an overhaul outage window." },
            { id: "C", text: "Compounded loss: Hundreds of millions of VND in delayed power generation revenue, combined with contractor standby penalty rates costing thousands of USD per hour." },
            { id: "D", text: "The delayed operator must personally reimburse the international contractor fees." }
          ],
          correctAnswer: "C",
          explanation: "Why C is correct: The Outage Cost Matrix demonstrates that unit delays directly erode grid generation revenues while accumulating contract standby penalties billed at thousands of USD/hour.\n\n• Why A is incorrect: Internal overtime costs are minuscule compared to commercial contract penalties and lost generation.\n• Why B is incorrect: Every delayed handover hour pushes back the synchronization milestone, directly reducing generation availability.\n• Why D is incorrect: Commercial liquidated damages are corporate liabilities, not ad-hoc individual payroll deductions."
        },
        {
          id: "m1_q10",
          number: 10,
          lessonId: "1.2",
          lessonLabel: "Video 1.2",
          caseTitle: "Case 5: Enforcing the \"G - 72 Hours\" Rule",
          scenario: "Boiler shutdown (Hour G) is scheduled for Friday at 08:00. On Monday, an operations engineer realizes that a specialized shaft mechanical seal is not in the warehouse stock.",
          question: "What is the strict engineering deadline for submitting this prioritized item to SCM?",
          choices: [
            { id: "A", text: "Thursday at 08:00 (24 hours prior)." },
            { id: "B", text: "Friday at 04:00 (4 hours prior to shutdown)." },
            { id: "C", text: "Tuesday at 08:00 (at least 72 hours prior to Hour G)." },
            { id: "D", text: "As soon as the turbine casing is lifted and the seal wear is physically inspected." }
          ],
          correctAnswer: "C",
          explanation: "Why C is correct: The technical rule mandates that all outage material requisitions must be delivered at least 72 hours prior to Hour G, categorized into 3 distinct priority tiers, allowing SCM to stage logistics.\n\n• Why A & B are incorrect: Submitting 24 hours or 4 hours prior violates the 72-hour requirement and triggers logistics bottlenecks.\n• Why D is incorrect: Waiting for casing unbolting to request standard overhaul parts introduces severe schedule disruption."
        },

        // ====================================================================
        // VIDEO 1.3 CASES (11 – 15)
        // ====================================================================
        {
          id: "m1_q11",
          number: 11,
          lessonId: "1.3",
          lessonLabel: "Video 1.3",
          caseTitle: "Case 1: Non-Standard Asset Identification During Defect Logging",
          scenario: "Engineer Hung detects an air vent leakage on Boiler Feed Pump 1. To speed up his reporting, he opens his personal spreadsheet Shift_Tracking.xlsx and logs: \"Pump-vent-valve-1 leaking, urgent repair needed\", sending it across to Maintenance and SCM.",
          question: "What downstream issue arises under the \"Use the Standard Code\" rule?",
          choices: [
            { id: "A", text: "Maintenance immediately pinpoints the component because the description is intuitive." },
            { id: "B", text: "A \"Data Mismatch\" occurs: CMMS and SCM systems cannot locate \"Pump-vent-valve-1\"; standard equipment hierarchy requires the asset tag BFP-01A-VALVE." },
            { id: "C", text: "SCM automatically issues an arbitrary valve from the warehouse for trial fitting." },
            { id: "D", text: "The personal spreadsheet syncs into the enterprise database automatically." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Free-text descriptions break data integration. Without standard KKS coding (e.g., BFP-01A-VALVE), maintenance cannot match replacement parts in ERP/CMMS systems, stalling repairs.\n\n• Why A is incorrect: Across redundant pumping trains, shorthand like \"Pump-vent-valve-1\" causes misidentification and wrong-equipment isolation.\n• Why C is incorrect: Warehouse compliance strictly prevents dispatching pressure parts without verified asset codes.\n• Why D is incorrect: Personal spreadsheets operate as isolated data silos, driving cross-functional misalignment."
        },
        {
          id: "m1_q12",
          number: 12,
          lessonId: "1.3",
          lessonLabel: "Video 1.3",
          caseTitle: "Case 2: Unit of Measurement Discrepancies",
          scenario: "An operator logs boiler drum pressure as 150 (assuming bar) and steam piping temperature as 122 (read from an older analog dial graduated in °F). The relief operator enters the station and runs calculations assuming standard SI units of kg/cm2 and °C.",
          question: "Which fundamental rule of operational data integrity was violated?",
          choices: [
            { id: "A", text: "Customer data confidentiality." },
            { id: "B", text: "\"Use the Standard Unit\": Pressure must strictly be standardized as bar and temperature as °C with explicit unit identifiers." },
            { id: "C", text: "No violation occurred; certified operators are expected to convert units mentally." },
            { id: "D", text: "Windows file-naming structure standards." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Video 1.3 explicitly mandates standard units: pressure in bar and temperature in °C to maintain consistent interpretation across Operations, Maintenance, and SSC.\n\n• Why A & D are incorrect: The issue is physical data integrity and operational safety, not cybersecurity or file naming.\n• Why C is incorrect: Relying on mental unit conversions during fast-moving shifts introduces fatal human-error traps."
        },
        {
          id: "m1_q13",
          number: 13,
          lessonId: "1.3",
          lessonLabel: "Video 1.3",
          caseTitle: "Case 3: Retrospective Batch Logging (Timestamp Mismatch)",
          scenario: "During a demanding 8-hour shift, Operator Nam scribbles field gauge readings onto a paper desk calendar. At 13:50 (10 minutes before relief), Nam opens the terminal and enters 20 consecutive readings, all showing a single recorded timestamp of 13:50.",
          question: "What is the operational consequence of this practice?",
          choices: [
            { id: "A", text: "The CCR terminal freezes due to high data-entry volume." },
            { id: "B", text: "It breaches \"Record the Real Timestamp\" — destroying time-series data fidelity, masking the parameter progression, and blinding the next shift to early warning indicators." },
            { id: "C", text: "It optimizes time management by consolidating clerical tasks at shift conclusion." },
            { id: "D", text: "No negative impact, as long as numerical entries are factually accurate." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Data only retains diagnostic value when pinned to its true measurement time. Batching entries at shift end flattens dynamic trends into a single snapshot, impeding root-cause investigations and trend detection.\n\n• Why A is incorrect: Enterprise historians handle thousands of tags per second; performance lag is not the issue.\n• Why C is incorrect: Saving personal clerical time transfers operational risk to the relief shift and data analysis systems.\n• Why D is incorrect: Accurate numbers tagged with false timestamps produce corrupted time-series data."
        },
        {
          id: "m1_q14",
          number: 14,
          lessonId: "1.3",
          lessonLabel: "Video 1.3",
          caseTitle: "Case 4: Managing Equipment Handover When Temperatures Exceed Safety Limits",
          scenario: "A mechanical maintenance crew arrives at the plant floor to receive handover of an ID fan for bearing replacement. The local monitoring display shows bearing temperature at 65°C, while safety procedures cap mechanical contact at < 50°C. The maintenance lead pushes for an immediate sign-off to keep their shift schedule intact.",
          question: "Under the structured handover protocol (State – Set the Limit – Offer a Solution), how should you respond?",
          choices: [
            { id: "A", text: "Sign the handover immediately and suggest the millwrights wear extra heat-resistant gloves." },
            { id: "B", text: "Refuse the handover flatly, walk away, and lock the CCR door without explanation." },
            { id: "C", text: "Apply the 3-step communication model: (1) State: \"Current bearing temperature is 65°C\"; (2) Set the Limit: \"Our safe mechanical threshold is strictly < 50°C\"; (3) Offer a Solution: \"We will run forced cooling air for 20 minutes and re-verify temperatures together at 14:20\"." },
            { id: "D", text: "Override the sensor offset in the control system to indicate 48°C so the permit can clear." }
          ],
          correctAnswer: "C",
          explanation: "Why C is correct: Exemplifies the STATE - SET THE LIMIT - OFFER A SOLUTION framework. It protects personnel from thermal injury while collaborating constructively to resolve schedule friction.\n\n• Why A is incorrect: Violates basic safety principles, shifting burn hazards directly onto maintenance personnel.\n• Why B is incorrect: Causes cross-functional hostility and stalls plant progress without resolving the thermal constraint.\n• Why D is incorrect: Falsifying instrumentation readings is a severe breach of technical ethics and process safety standards."
        },
        {
          id: "m1_q15",
          number: 15,
          lessonId: "1.3",
          lessonLabel: "Video 1.3",
          caseTitle: "Case 5: The Golden Rule Across the Enterprise Value Stream",
          scenario: "Operational information flows along the chain: Operations → SCM → Maintenance → SSC. An operations engineer is filing an urgent defect notice for a high-pressure heater tube leak.",
          question: "Which behavior fully embodies the module's \"Golden Rule\"?",
          choices: [
            { id: "A", text: "Sending a terse notification: \"Heater broken, please repair ASAP.\"" },
            { id: "B", text: "Generating the verified KKS asset tag, attaching time-stamped pressure/temperature trends, detailing physical isolation boundaries, and synchronizing the ticket across Maintenance and SCM via the centralized system." },
            { id: "C", text: "Making an informal phone call to the SCM Manager requesting expedited component purchasing." },
            { id: "D", text: "Leaving a handwritten memo taped to the workshop noticeboard." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Integrates Clear Data, Clear Communication, and Safe Handover. Supplying structured, standardized data ensures all downstream entities share an identical, unambiguous baseline.\n\n• Why A is incorrect: Vague descriptions cause confusion, leaving SCM unable to source components and Maintenance unable to assess risk.\n• Why C is incorrect: Bypassing central logging leaves no auditable digital trail and excludes other affected stakeholder groups.\n• Why D is incorrect: Handwritten notes risk physical loss, lack time-stamping, and run counter to plant digitization standards."
        }
      ]
    },

    // ------------------------------------------------------------------------
    // MODULE 2: THE OUTAGE DECISION (Scenario Simulation)
    // ------------------------------------------------------------------------
    module2: {
      id: "module2",
      number: 2,
      code: "2.0",
      badge: "MODULE 2",
      title: "The Outage Decision",
      subtitle: "Apply the ADAPT framework to make a safe and coordinated decision under time pressure.",
      estimatedTime: "5 – 7 minutes",
      learningMode: "Branching Scenario & Practice",
      role: "O&M Engineer",
      bannerImage: "assets/plant_hero_banner.jpg",

      mission: {
        title: "YOUR MISSION",
        description: "You are an O&M Engineer supporting the planned boiler overhaul at AES Mong Duong. Make a safe and informed decision while protecting equipment readiness, the outage schedule, and cross-functional coordination."
      },

      operationalStatus: {
        timeToHandover: "03:00:00",
        gasketCodes: "3 mismatched (Action required)",
        boilerTemp: "545°C (Slight fluctuation)",
        maintenance: "Waiting (Confirmation required)",
        scmApproval: "Pending (Verification required)",
        outageSchedule: "At risk (Requires coordination)"
      },

      // "What you will learn upon completing these lessons"
      learningOutcomes: [
        {
          icon: "exclamation-triangle",
          title: "Real-Time Crisis Management",
          desc: "Diagnose multiple simultaneous operational alerts under strict time constraints."
        },
        {
          icon: "clipboard-document-check",
          title: "Material Code Verification",
          desc: "Resolve high-pressure gasket specification mismatches with SCM without halting critical path."
        },
        {
          icon: "chart-bar",
          title: "Telemetry & DCS Analysis",
          desc: "Correlate slight combustion temperature drift with safe boiler cooling curves."
        },
        {
          icon: "chat-bubble-left-right",
          title: "Adaptive Stakeholder Alignment",
          desc: "Mobilize SCM, DCS operators, and Maintenance contractors into a unified decision loop."
        }
      ],

      // Five videos labeled 2.1 through 2.5
      videos: [
        {
          id: "2.1",
          label: "Lesson 2.1",
          title: "Video 2.1: Step [A] — Assess (Multi-Dimensional Assessment)",
          duration: "05:10",
          videoUrl: "https://youtu.be/sWWDKC8ECJk",
          overview: "Multi-dimensional evaluation across Technical Parameters, Material Readiness, and Workforce Capacity to eliminate single-point operational traps before outage handover.",
          keyPoints: [
            "3-Dimensional Assessment Principle: Parameters, Parts, and People",
            "Accounting for thick-walled thermal inertia & residual pressure gradients",
            "Enforcing the Outage 3-Point Pre-check Matrix before sign-off"
          ]
        },
        {
          id: "2.2",
          label: "Lesson 2.2",
          title: "Video 2.2: Step [D] — Discuss (Cross-Functional Dialogue)",
          duration: "06:25",
          videoUrl: "https://youtu.be/hrBQ-ePEvlE",
          overview: "Escaping the 'Email Fortress' trap with direct verbal engagement, 5-minute stand-up huddles, and SBAR structured cross-functional dialogue.",
          keyPoints: [
            "Avoiding defensive email chains during active outage windows",
            "Applying the SBAR (Situation, Impact, Expectation) framework with SCM",
            "De-escalating maintenance confrontation with live data and operational alternatives"
          ]
        },
        {
          id: "2.3",
          label: "Lesson 2.3",
          title: "Video 2.3: Step [A] — Alternative Thinking (Engineering Contingency)",
          duration: "04:50",
          videoUrl: "https://youtu.be/i1T1kvHK_Jw",
          overview: "Overcoming static SOP decision paralysis with certified Plan B engineering equivalences, process re-sequencing, and respecting Safe Operating Limits (SOL).",
          keyPoints: [
            "Overcoming static SOP compliance paralysis under component delays",
            "Plan B: Technical equivalence validation within Safe Operating Limits (SOL)",
            "Plan C: Process re-sequencing to keep parallel work fronts productive"
          ]
        },
        {
          id: "2.4",
          label: "Lesson 2.4",
          title: "Video 2.4: Step [P] — Problem-Solve (Field Bottleneck Resolution)",
          duration: "05:45",
          videoUrl: "https://youtu.be/shcylD5gfIY",
          overview: "Resolving on-site bottlenecks at the source, enforcing verified Zero-Energy isolation, and eliminating verbal LOTO paperwork debt.",
          keyPoints: [
            "Rejecting verbal handovers and eliminating LOTO paperwork debt",
            "Verifying Zero-Energy: 0V, 0 bar, and local Try-step confirmation",
            "Completing the 8-point Digital Handover Checklist on-site via tablet"
          ]
        },
        {
          id: "2.5",
          label: "Lesson 2.5",
          title: "Video 2.5: Step [T] — Take Action & Learn (Standardized Action & Reflection)",
          duration: "07:12",
          videoUrl: "https://youtu.be/cxyPxDxy4H4",
          overview: "The 15-minute digital logging standard, the Diamond Reflection Tool (Top, Sides, Bottom), and driving Kirkpatrick Level 4 business results.",
          keyPoints: [
            "100% digital shift logging within 15 minutes for Workday and AI feeds",
            "Capturing successes, bottlenecks, and critical lessons in the Diamond Reflection Tool",
            "Kirkpatrick Level 4: safeguarding PPA milestones and plant efficiency"
          ]
        }
      ],

      // Module Practice Quiz (15 scenario cases across Videos 2.1, 2.3, 2.5)
      quiz: [
        // ====================================================================
        // VIDEO 2.1 CASES
        // ====================================================================
        {
          id: "m2_q1",
          number: 1,
          lessonId: "2.1",
          lessonLabel: "Video 2.1",
          caseTitle: "Case 1: Handover Pressure Amid Missing Critical Path Spares",
          scenario: "Boiler temperature has cooled down to 60°C, and furnace bottom residual pressure is at 0 bar, strictly adhering to the standard DCS cool-down curve. The Maintenance Shift Lead urges: \"The technical parameters are fully cleared. Sign the isolation handover immediately so my team can unbolt the drum door and stay on track for the first 24-hour milestone!\" However, upon checking the internal Supply Chain (SCM) portal, you notice that 2 high-pressure heat-resistant gasket sets remain marked as \"Pending Customs Inspection\" (not yet received into warehouse inventory).",
          question: "Following the 3-Dimensional Assessment principle, what is your best course of action?",
          choices: [
            { id: "A", text: "Sign the handover immediately because Operations' sole duty is to bring boiler parameters down to technical limits (60°C)." },
            { id: "B", text: "Hold off on signing; activate the multi-dimensional Assess protocol, notify maintenance of the customs delay on the 2 critical gaskets, establish the projected delay window, and align on next steps." },
            { id: "C", text: "Call and reprimand the warehouse personnel for failing to work overtime to clear incoming shipments." },
            { id: "D", text: "Minimize the SCM tracking window on your workstation and focus strictly on drum metal thermal expansion." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: This reflects the core simulation exercise of Video 2.1. An LTEM Level 6 operator avoids the one-dimensional assessment trap (relying solely on DCS screens). Handing over equipment before critical path spare parts are physically staged causes contractors to idle on an opened system, directly violating the Material Readiness dimension.\n\n• Why A is incorrect: Falls into the isolated mindset (\"The boiler cooled on schedule, so my job is done\"), which was identified in past Root Cause Analysis (RCA) records as the root cause of handover misalignment.\n• Why C is incorrect: Emotional blaming damages cross-functional collaboration and fails to manage the underlying technical constraint.\n• Why D is incorrect: Intentionally ignores material readiness data, breaching cross-check principles on the Outage 3-Point Pre-check Matrix."
        },
        {
          id: "m2_q2",
          number: 2,
          lessonId: "2.1",
          lessonLabel: "Video 2.1",
          caseTitle: "Case 2: Accounting for Thick-Walled Metal Thermal Inertia",
          scenario: "Internal flue gas temperature has dropped to 55°C (well below the <60°C work-entry ceiling). Parts and maintenance personnel are confirmed ready. However, metal wall temperature sensors on the thick-walled steam drum still read 78°C due to significant thermal inertia.",
          question: "How should you evaluate this Technical Parameter dimension prior to sign-off?",
          choices: [
            { id: "A", text: "Authorize handover immediately since internal gas temperature is 55°C and personnel will only breathe ambient air." },
            { id: "B", text: "Withhold mechanical handover; explain to maintenance the contact burn and thermal shock hazards (78°C), and maintain forced cooling air until structural metal temperatures homogenize within safety limits." },
            { id: "C", text: "Spray cold utility water directly onto drum external walls to force metal temperatures down to 50°C." },
            { id: "D", text: "Override and disable the metal temperature sensor tag on DCS, assuming it is drifting relative to gas temperatures." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Technical assessment encompasses thermal inertia, metal expansion gradients, and residual pressure, rather than a single superficial reading. Entering a space with 78°C heavy metal surfaces creates contact burn and component fatigue risks.\n\n• Why A is incorrect: Ignores thermal inertia; millwrights coming into contact with 78°C metal faces risk contact burns, and unbolting hot joints can warp seating faces.\n• Why C is incorrect: Direct cold water quenching induces severe thermal shock, risking structural micro-cracking in thick-walled boiler steel.\n• Why D is incorrect: Falsifying safety parameters violates process safety baselines."
        },
        {
          id: "m2_q3",
          number: 3,
          lessonId: "2.1",
          lessonLabel: "Video 2.1",
          caseTitle: "Case 3: Reviewing Contractor Crew Competency (Workforce Dimension)",
          scenario: "The Low-Pressure (LP) Turbine casing is prepared for handover. Three-point verification confirms: thermal/pressure values are within range, and replacement seals are staged at the work front. However, the contractor dispatches two newly hired apprentices without the certified lead millwright listed on the approved outage qualification roster.",
          question: "What assessment decision should you take?",
          choices: [
            { id: "A", text: "Sign the handover immediately, considering contractor staffing an internal vendor matter outside Operations' boundary." },
            { id: "B", text: "Pause handover under Dimension 3 (Workforce Capacity) and require the contractor to provide qualified, certified supervisory personnel per the outage contract before turning over the turbine casing." },
            { id: "C", text: "Direct CCR console operators down to the turbine deck to unbolt casing studs on the contractor's behalf to maintain schedule." },
            { id: "D", text: "Complete the handover and request nearby janitorial staff to keep watch over the new technicians." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: The third dimension of the Assess protocol is \"Workforce Capacity\" — evaluating whether incoming personnel possess the requisite count and competency. Handing heavy machinery over to unqualified personnel risks equipment damage and serious safety events.\n\n• Why A is incorrect: Reflects localized optimization; contractor damage to turbine casings threatens the entire 25-day outage schedule.\n• Why C is incorrect: Violates functional separation; operations personnel lack mechanical contractor qualifications and authority.\n• Why D is incorrect: Violates contractor safety and oversight protocols."
        },
        {
          id: "m2_q4",
          number: 4,
          lessonId: "2.1",
          lessonLabel: "Video 2.1",
          caseTitle: "Case 4: Filtering 10 Critical Path Materials for the First 24 Hours",
          scenario: "On the internal material dashboard, 180 total part numbers are scheduled across the 25-day outage. Unit de-synchronization is exactly 2 hours away.",
          question: "What is the correct action when cross-referencing DCS screens with the inventory portal?",
          choices: [
            { id: "A", text: "Print all 180 line items on paper and manually audit warehouse bins line by line." },
            { id: "B", text: "Apply the quick filter to isolate the 10 Critical Path material tags required exclusively for the first 24-hour shutdown window (e.g., isolation valves, high-temp gaskets, seating seals)." },
            { id: "C", text: "Check only general hardware items (bolts and nuts) since they represent the highest total quantity." },
            { id: "D", text: "Skip material filtering and defer full requisition checks to Shift 2." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: This is the operational procedure instructed in Video 2.1: Keep both windows active and filter for the top 10 Critical Path codes tied to the initial 24 hours to clear early bottlenecks.\n\n• Why A is incorrect: Manually auditing 180 items right before shutdown creates administrative drag and delays de-synchronization milestones.\n• Why C is incorrect: Standard fasteners are typically low-risk items and rarely sit on the primary critical path.\n• Why D is incorrect: Passes operational debt to incoming shifts, violating cross-shift ownership."
        },
        {
          id: "m2_q5",
          number: 5,
          lessonId: "2.1",
          lessonLabel: "Video 2.1",
          caseTitle: "Case 5: Applying the Outage 3-Point Pre-check Matrix",
          scenario: "You are about to electronically sign the handover permit for Boiler Feed Pump BFP-01A via your tablet. The tablet dashboard displays:\n• Technical Parameters (Pressure = 0 bar; T = 45°C): GREEN\n• Workforce Capacity (4 certified mechanical technicians present): GREEN\n• Material Readiness (Proprietary mechanical seal assembly): RED (customs clearance delayed at port)",
          question: "What is your required standardized action?",
          choices: [
            { id: "A", text: "Hit \"Override\" to turn the material box green because 2 out of 3 criteria are met." },
            { id: "B", text: "Withhold sign-off, maintain the pre-handover state, log the material bottleneck in the digital logbook, and trigger Step [D] — DISCUSS with SCM and Maintenance." },
            { id: "C", text: "Post an accusatory message targeting SCM on the plant-wide messaging channel and leave for lunch." },
            { id: "D", text: "Bypass the tablet by executing a handwritten paper permit to bypass system blocks." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: The Outage 3-Point Pre-check Matrix prohibits turnover whenever any single dimension flags RED. The engineer must hold the boundary and trigger cross-functional communication.\n\n• Why A is incorrect: Forcing overrides tampers with digital process controls and falsifies safety readiness.\n• Why C is incorrect: Increases friction without solving the part clearance issue.\n• Why D is incorrect: Using paper workarounds compromises audit trails and defeats digital tracking safeguards."
        },
        // ====================================================================
        // VIDEO 2.3 CASES
        // ====================================================================
        {
          id: "m2_q6",
          number: 6,
          lessonId: "2.3",
          lessonLabel: "Video 2.3",
          caseTitle: "Case 1: Addressing \"Decision Paralysis\" Under Component Delays",
          scenario: "A specialized abrasion-resistant pulverized coal valve is delayed at sea. Contractors stand ready at the mill. The responsible operations engineer states: \"The SOP specifies this exact model number. Without it, we stop work. I won't approve any alternative because I could be penalized for a procedural deviation.\"",
          question: "What does this behavior indicate regarding engineering competency?",
          choices: [
            { id: "A", text: "Uncompromising technical discipline aligned with site policy." },
            { id: "B", text: "\"Decision Paralysis\" driven by a static SOP mindset, lacking dynamic problem-solving through alternative options (Alternative Thinking)." },
            { id: "C", text: "Prudent risk management that protects capital resources." },
            { id: "D", text: "LTEM Level 7 field reflex competence." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Video 2.3 highlights how static SOP compliance can paralyze decision-making, leading engineers to wait for written executive directives when Plan A fails instead of evaluating approved engineering alternatives.\n\n• Why A & C are incorrect: Halting progress without exploring safe alternatives drives schedule delays and idle contractor costs.\n• Why D is incorrect: This is a Level 4 compliance failure; Level 7 involves adapting within verified safety bounds when initial plans fail."
        },
        {
          id: "m2_q7",
          number: 7,
          lessonId: "2.3",
          lessonLabel: "Video 2.3",
          caseTitle: "Case 2: Executing Plan B — Engineering Equivalence",
          scenario: "Manual bottom blowdown valve V-BLW-01 has a cracked body. Warehouse inventory for that specific part code is exhausted, but an alternative valve, V-BLW-02, is available from project stock: identical pressure rating (ANSI 2500#), same alloy specification (ASTM A182 F91), identical flange dimensions, and recognized by the OEM as an engineering equivalent.",
          question: "Following Plan B, what should the engineer do?",
          choices: [
            { id: "A", text: "Reject V-BLW-02 because the suffix on the nameplate does not match the old part number." },
            { id: "B", text: "Install V-BLW-02 immediately without documentation or notification." },
            { id: "C", text: "Initiate Plan B: Cross-check Safe Operating Limit (SOL) boundaries, complete an Engineering Equivalence Form, obtain expedited sign-off from the Engineering Manager, and issue the component for installation." },
            { id: "D", text: "Weld the cracked valve body on-site and reinstall it." }
          ],
          correctAnswer: "C",
          explanation: "Why C is correct: Represents Plan B (Engineering Equivalence): Proactively verify operating parameters, document technical parity against SOL boundaries, secure expedited sign-off, and protect outage schedules safely.\n\n• Why A is incorrect: Shows rigid compliance that overlooks certified engineering equivalence.\n• Why B is incorrect: Installing modified components without documentation violates Management of Change (MOC) controls.\n• Why D is incorrect: Welding cracked high-pressure alloy valve bodies without certified metallurgical procedures introduces severe rupture risks."
        },
        {
          id: "m2_q8",
          number: 8,
          lessonId: "2.3",
          lessonLabel: "Video 2.3",
          caseTitle: "Case 3: Executing Plan C — Process Re-sequencing",
          scenario: "Under the baseline schedule (Plan A), maintenance must replace the furnace bottom slag valve before unbolting the steam drum door. However, the slag valve is jammed and requires specialized pulling tools that are 5 hours away. The drum door maintenance crew is standing by idle.",
          question: "How should the operations engineer implement Plan C (Process Re-sequencing)?",
          choices: [
            { id: "A", text: "Dismiss the maintenance crews and tell them to return tomorrow once the bottom valve is pulled." },
            { id: "B", text: "Implement Plan C: Conduct a cross-system risk review, isolate the bottom slag section independently, verify boundary safety, and release the steam drum door for unbolting to utilize contractor time." },
            { id: "C", text: "Instruct mechanics to shatter the bottom valve with sledgehammers to force removal." },
            { id: "D", text: "Allow drum door unbolting without isolating the lower boiler headers." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Demonstrates Plan C (Process Re-sequencing): When one path stalls, re-sequence independent tasks within safe boundaries to maintain workflow.\n\n• Why A is incorrect: Idles contractor personnel and extends the overall unit timeline.\n• Why C is incorrect: Damages adjacent equipment and creates physical safety risks.\n• Why D is incorrect: Working without proper subsystem isolation introduces cross-system hazards."
        },
        {
          id: "m2_q9",
          number: 9,
          lessonId: "2.3",
          lessonLabel: "Video 2.3",
          caseTitle: "Case 4: Evaluating Safe Operating Limit (SOL) Boundaries",
          scenario: "A proposal is made to run a temporary lube oil bypass line around a clogged duplex filter to support ongoing flushing.",
          question: "When checking the Safe Operating Limit (SOL) boundaries, which parameter must NEVER be compromised?",
          choices: [
            { id: "A", text: "Total fabrication time must remain under 30 minutes." },
            { id: "B", text: "The paint color of the temporary line must match the host piping." },
            { id: "C", text: "Maximum operating pressure must remain below the Trip Limit, and pressure protection relief paths must remain active and independent." },
            { id: "D", text: "Reused structural bolts must be used to minimize inventory expense." }
          ],
          correctAnswer: "C",
          explanation: "Why C is correct: Video 2.3 defines SOL boundaries and Trip Limits as strict technical guardrails. Alternatives are only acceptable if they operate safely within certified process limits.\n\n• Why A, B, & D are incorrect: These are superficial or counterproductive factors that do not determine the pressure boundary integrity of the system."
        },
        {
          id: "m2_q10",
          number: 10,
          lessonId: "2.3",
          lessonLabel: "Video 2.3",
          caseTitle: "Case 5: Coal Mill Bottleneck vs. ID Fan Readiness",
          scenario: "On Day 5 of the outage, Coal Mill 2 overhaul cannot proceed because new roller bearings have not cleared incoming inspection. However, the Induced Draft (ID Fan) along the same gas path has all materials and crews ready to proceed.",
          question: "Which decision reflects LTEM Level 7 competency?",
          choices: [
            { id: "A", text: "Freeze work across the entire coal milling and flue gas path until mill bearings arrive." },
            { id: "B", text: "Apply the Decision Tree: Isolate Coal Mill 2 independently, sign the handover for the ID Fan work front, and release the mechanical contractor to proceed." },
            { id: "C", text: "Reinstall worn bearings into Coal Mill 2 to close out the permit." },
            { id: "D", text: "Sign off the mill handover on paper while barring mechanics from entering the physical area." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Aligns with the scenario tree: Isolate stalled equipment, verify boundaries, and release cleared work fronts so bottlenecks on one component do not halt parallel systems.\n\n• Why A is incorrect: Inflexible scheduling that idles available contractor crews.\n• Why C is incorrect: Installing damaged components compromises post-overhaul reliability.\n• Why D is incorrect: Falsifying paperwork undermines data transparency and work-front safety."
        },
        // ====================================================================
        // VIDEO 2.5 CASES
        // ====================================================================
        {
          id: "m2_q11",
          number: 11,
          lessonId: "2.5",
          lessonLabel: "Video 2.5",
          caseTitle: "Case 1: The 15-Minute Data Entry Window",
          scenario: "A complex boiler isolation shift concludes at 14:00. All physical isolations, valve closures, and material adjustments are complete. An engineer begins packing up, remarking: \"I'm exhausted. I'll enter the equipment logs and material movements onto Workday tomorrow.\"",
          question: "Under the Take Action protocol, what is the required operational standard?",
          choices: [
            { id: "A", text: "Allow the engineer to leave; manual fieldwork takes precedence over computer logging." },
            { id: "B", text: "Ensure all shift handover records and material movement updates are submitted in Workday/JDXpert within 15 minutes of completion, eliminating ad-hoc paper notes and delayed entries." },
            { id: "C", text: "Save the data in a local spreadsheet on the desktop to bulk-upload at the end of the week." },
            { id: "D", text: "Delegate logging duties to site security personnel at the end of their shift." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Video 2.5 establishes that 100% of shift handovers and inventory updates must be logged into Workday/JDXpert within 15 minutes. Accurate, real-time data is required for Shared Services (SSC) accounting and continuous optimization by plant AI models.\n\n• Why A is incorrect: Field tasks are not administratively closed until the digital information flow is submitted.\n• Why C is incorrect: Using standalone spreadsheets recreates data mismatches and isolates technical information.\n• Why D is incorrect: Non-technical staff lack operational permissions and domain knowledge to log plant configurations."
        },
        {
          id: "m2_q12",
          number: 12,
          lessonId: "2.5",
          lessonLabel: "Video 2.5",
          caseTitle: "Case 2: Documenting Success in the Top of the Diamond",
          scenario: "During the final 3 minutes of a shift, the crew opens the mobile Diamond Reflection Tool.",
          question: "Which entry best exemplifies the \"Top of the Diamond\" (Peak)?",
          choices: [
            { id: "A", text: "A log of employees who arrived late during the past month." },
            { id: "B", text: "Recording the successful deployment of Plan C (Process Re-sequencing), which enabled drum unbolting 3 hours ahead of target with zero safety incidents." },
            { id: "C", text: "Calculating projected personal overtime bonuses for the 25-day outage window." },
            { id: "D", text: "Rating the quality of off-site lunch deliveries." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: The Top of the Diamond captures: \"What did the shift execute exceptionally well under the ADAPT framework?\" Logging a successful Plan C implementation establishes proven field practices across the organization.\n\n• Why A, C, & D are incorrect: These entries do not capture operational learning or technical reflections within the ADAPT framework."
        },
        {
          id: "m2_q13",
          number: 13,
          lessonId: "2.5",
          lessonLabel: "Video 2.5",
          caseTitle: "Case 3: Capturing Friction in the Sides of the Diamond",
          scenario: "Completing the \"Sides of the Diamond\" section of the reflection tool following a shift delayed by 45 minutes due to signature bottlenecks for high-pressure gaskets.",
          question: "Which log entry provides the most constructive operational feedback?",
          choices: [
            { id: "A", text: "\"SCM was negligent; the warehouse supervisor should be replaced.\"" },
            { id: "B", text: "\"Bottleneck: Critical path gasket dispatch encountered a 45-minute authorization delay. Recommendation: Grant mobile digital approval rights to SCM leads during night-shift outages.\"" },
            { id: "C", text: "\"No issues noted; shift performance was flawless.\"" },
            { id: "D", text: "\"Operations should bypass warehouse checks and access bins directly next time.\"" }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: The Sides of the Diamond target: \"Which material or communication bottlenecks require immediate resolution?\" Pinpointing the root delay and suggesting mobile digital authorization provides actionable input for process improvement.\n\n• Why A is incorrect: Personal attacks fail to address system-level administrative bottlenecks.\n• Why C is incorrect: Omitting real bottlenecks conceals performance gaps and prevents operational improvements.\n• Why D is incorrect: Proposes unauthorized actions that breach internal audit and inventory controls."
        },
        {
          id: "m2_q14",
          number: 14,
          lessonId: "2.5",
          lessonLabel: "Video 2.5",
          caseTitle: "Case 4: Capturing Critical Lessons in the Bottom of the Diamond",
          scenario: "During valve testing, a boiler drain gauge gave a false zero reading due to internal scale buildup; fortunately, the engineer caught the discrepancy via dual-point thermal checks before unbolting.",
          question: "What should be logged in the \"Bottom of the Diamond\" for incoming Shift Supervisors?",
          choices: [
            { id: "A", text: "\"Shift passed normally without incident.\"" },
            { id: "B", text: "\"Bottom of Diamond: Critical Lesson — Never trust a single bottom-drain pressure gauge; always blow down sensing lines and cross-verify metal wall temperatures before opening mechanical flanges.\"" },
            { id: "C", text: "\"Remind incoming engineers to bring extra cold beverages to the control room.\"" },
            { id: "D", text: "\"Incoming leads can discover equipment quirks independently; no log required.\"" }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: The Bottom of the Diamond is reserved for: \"What critical lesson must be handed over to the incoming Shift Supervisor?\" Documenting a near-miss educates incoming crews and helps prevent potential line-break accidents.\n\n• Why A is incorrect: Withholding near-miss warnings leaves subsequent crews vulnerable to the same latent hazard.\n• Why C is incorrect: Trivial personal notes do not belong in plant technical logs.\n• Why D is incorrect: Breaks shift communication chains and breaches safety reporting obligations."
        },
        {
          id: "m2_q15",
          number: 15,
          lessonId: "2.5",
          lessonLabel: "Video 2.5",
          caseTitle: "Case 5: Delivering High-Level Business Impact (Kirkpatrick Level 4 - Results)",
          scenario: "Why does the operational training program emphasize strict digital logging within 15 minutes rather than focusing solely on physical plant operations?",
          question: "What primary operational and business outcome (Kirkpatrick Level 4) does this secure?",
          choices: [
            { id: "A", text: "Providing daily paperwork for clerical teams to audit." },
            { id: "B", text: "Real-time data streams enable Shared Services (SSC) to reconcile contracts promptly and feed operational data to AI models, safeguarding plant efficiency and the 25-day outage critical path." },
            { id: "C", text: "Enabling management to penalize engineers for minor data entry omissions." },
            { id: "D", text: "Utilizing unused storage on plant cloud servers." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Reflects the strategic goal of Kirkpatrick Level 4: Clean, timely operational data enables automated contractor reconciliations via SSC, trains plant optimization models, and keeps the outage within schedule.\n\n• Why A & D are incorrect: Administrative busywork and storage usage are not strategic plant operational drivers.\n• Why C is incorrect: Framing data governance as a punitive measure undermines reporting transparency and organizational learning culture."
        }
      ]
    },

    // ------------------------------------------------------------------------
    // MODULE 3: DIGITAL HANDOVER
    // ------------------------------------------------------------------------
    module3: {
      id: "module3",
      number: 3,
      code: "3.0",
      badge: "MODULE 3",
      title: "Digital Handover & Continuous Improvement",
      subtitle: "Ensure zero-defect shift transitions and track operational lessons learned.",
      estimatedTime: "6 – 8 minutes",
      learningMode: "Digital Handover",
      role: "O&M Engineer",
      bannerImage: "assets/plant_hero_banner.jpg",

      mission: {
        title: "YOUR MISSION",
        description: "Standardize digital shift handovers, document operational adjustments made during the outage, and ensure critical technical data is seamlessly transferred to oncoming shift teams."
      },

      // "What you will learn upon completing these lessons"
      learningOutcomes: [
        {
          icon: "document-text",
          title: "Zero-Defect Shift Logs",
          desc: "Structure digital handover notes with precise parameter tags, LOTO permits, and action items."
        },
        {
          icon: "arrow-path",
          title: "Closed-Loop Communication",
          desc: "Verify that incoming shift engineers acknowledge and understand open operational variances."
        },
        {
          icon: "archive-box",
          title: "Knowledge Retention",
          desc: "Capture troubleshooting patterns so future shifts can resolve similar gasket or temperature issues."
        },
        {
          icon: "presentation-chart-line",
          title: "Continuous Improvement (Kaizen)",
          desc: "Turn real-time operational deviations into permanent updates for plant standard procedures."
        }
      ],

      // Three videos labeled 3.1, 3.2, and 3.3
      videos: [
        {
          id: "3.1",
          label: "Lesson 3.1",
          title: "Video 3.1: The Art of Trade-Offs: Balancing Schedule, Cost, and Safety",
          duration: "04:30",
          videoUrl: "https://youtu.be/uWfeV-KbuEU",
          overview: "Balancing the Trade-Off Triangle across Schedule, Cost, and Safety to optimize plant-level outcomes rather than isolated shift-level metrics.",
          keyPoints: [
            "Evaluating the Trade-off Triangle for outage handovers",
            "Using the Decision Trade-off Calculator with safety margin buffers",
            "Safeguarding the -50 Btu Heat Rate target and asset integrity"
          ]
        },
        {
          id: "3.2",
          label: "Lesson 3.2",
          title: "Video 3.2: Multi-Variable Execution: Simultaneous SCM & SSC Constraints",
          duration: "05:15",
          videoUrl: "https://youtu.be/gOqrX8yeouw",
          overview: "Tackling multi-variable constraints: 4-step execution framework (Freeze & Triage, Cross-functional Ingestion, SSC Data Alignment, Work Re-sequencing).",
          keyPoints: [
            "Step 1: Freeze & Triage under simultaneous operational pressure",
            "Step 2 & 3: Direct SCM communication and 20-minute SSC data alignment",
            "Step 4: Manpower re-sequencing to eliminate contractor standby penalties"
          ]
        },
        {
          id: "3.3",
          label: "Lesson 3.3",
          title: "Video 3.3: Field Transfer: The On-Site Action Commitment",
          duration: "04:45",
          videoUrl: "https://youtu.be/h-aR-gZu0QY",
          overview: "Beating the Ebbinghaus Forgetting Curve through deliberate on-site application: the A10 Individual Action Plan, Q-Cards (Safety Courage), and Kirkpatrick Level 4 impact.",
          keyPoints: [
            "Overcoming the 48-hour forgetting curve via 70-20-10 learning transfer",
            "Drafting concrete behavioral shifts in the A10 Action Plan",
            "Supervisory Q-Card observations and linking field habits to PPA & Heat Rate outcomes"
          ]
        }
      ],

      // Module Practice Quiz (10 scenario cases across Videos 3.2, 3.3)
      quiz: [
        // ====================================================================
        // VIDEO 3.2 CASES
        // ====================================================================
        {
          id: "m3_q1",
          number: 1,
          lessonId: "3.2",
          lessonLabel: "Video 3.2",
          caseTitle: "Case 1: Responding to a Dual-Constraint Shock",
          scenario: "At the start of an outage morning shift, the CCR receives three competing constraints at once:\n• SCM reports: The replacement high-pressure valve shipment is delayed at customs by an additional 2 days.\n• SSC reports: Last night's digital handover logs were rejected due to non-standard asset naming syntax.\n• Maintenance reports: 30 contractor millwrights are standing at the CCR door demanding immediate field clearance to begin unbolting.",
          question: "What does Step 1 (Freeze & Triage) require the Shift Supervisor to do first?",
          choices: [
            { id: "A", text: "Sign the high-pressure valve work permit immediately to disperse the crowd of 30 millwrights." },
            { id: "B", text: "Freeze field actions, remain composed, and triage the constraints: determine which threatens life safety, which drives the critical path, and which is an administrative hurdle." },
            { id: "C", text: "Lock the control room doors, switch off plant landlines, and decline communication with all three teams." },
            { id: "D", text: "Draft an emergency escalation email to the Managing Director complaining about SCM and SSC." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Step 1 requires triage: prevent panic, hold work boundaries, and categorize variables by safety risk, schedule impact, and administrative priority.\n\n• Why A is incorrect: Releasing isolation when replacement valves are delayed by 2 days leaves high-pressure systems dismantled and vulnerable, creating safety and schedule bottlenecks.\n• Why C is incorrect: Severing communication halts operational coordination and deepens the outage delay.\n• Why D is incorrect: Retaliatory emails represent administrative evasion rather than active problem-solving."
        },
        {
          id: "m3_q2",
          number: 2,
          lessonId: "3.2",
          lessonLabel: "Video 3.2",
          caseTitle: "Case 2: Engaging Secondary Communication Channels",
          scenario: "Following news that the replacement valve shipment is delayed 2 days, a CCR engineer assumes: \"SCM must have botched the procurement filing. Let's suspend the work track indefinitely.\"",
          question: "Under Step 2 (Cross-functional Ingestion), what is the standardized operator response?",
          choices: [
            { id: "A", text: "Wait passively in the CCR for SCM to provide a formal written explanation by the end of the week." },
            { id: "B", text: "Avoid unverified assumptions; use secondary communication channels (recorded plant radio or Starmind AI) to engage SCM directly: \"What is the root cause of the delay, and do we have approved technical equivalents available?\"" },
            { id: "C", text: "Post complaints on external social media regarding internal supply chain responsiveness." },
            { id: "D", text: "Enter the warehouse unescorted and demand parts from storekeepers." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Step 2 emphasizes direct cross-functional engagement: verify facts directly via plant comms or Starmind AI, determine the root cause, and explore approved engineering alternatives.\n\n• Why A is incorrect: Waiting for formal memos wastes valuable operational time needed to implement contingency plans.\n• Why C & D are incorrect: Unprofessional actions that breach internal communication policies and inventory controls."
        },
        {
          id: "m3_q3",
          number: 3,
          lessonId: "3.2",
          lessonLabel: "Video 3.2",
          caseTitle: "Case 3: Resolving SSC Data Discrepancies Within 20 Minutes",
          scenario: "Shared Services (SSC) rejects an entire shift handover package because an operator used shorthand codes (Valve-01 instead of BFP-01A-VALVE), blocking milestone sign-offs for maintenance contractors.",
          question: "How should Step 3 (Data Alignment with SSC) be executed within the 20-minute window?",
          choices: [
            { id: "A", text: "Argue with SSC that their criteria are overly rigid and demand they correct the equipment tags themselves." },
            { id: "B", text: "Assign one engineer to audit the mismatched data fields, align them with standardized plant KKS syntax, and resubmit clean data within 20 minutes." },
            { id: "C", text: "Delete the entire shift record and proceed as if no maintenance occurred." },
            { id: "D", text: "Defer the reconciliation until the next annual overhaul cycle." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Step 3 standardizes data reconciliation: designate a dedicated engineer to correct non-standard codes and return clean data within 20 minutes, unblocking commercial sign-offs.\n\n• Why A is incorrect: SSC must comply with strict audit standards; arguing delays processing without resolving the syntax error.\n• Why C is incorrect: Deleting maintenance logs violates operational governance and compliance mandates.\n• Why D is incorrect: Delaying reconciliation blocks contractor invoicing and creates contract compliance risks."
        },
        {
          id: "m3_q4",
          number: 4,
          lessonId: "3.2",
          lessonLabel: "Video 3.2",
          caseTitle: "Case 4: Work Re-sequencing to Deploy 30 Millwrights",
          scenario: "The replacement high-pressure valve is delayed 2 days, but 30 mechanical contractor specialists are already mobilized on site, with standby billing active.",
          question: "How should the operations engineer apply Step 4 (Re-sequencing) to protect budget and milestones?",
          choices: [
            { id: "A", text: "Leave the 30 technicians on standby in the laydown yard and absorb the hourly penalty fees." },
            { id: "B", text: "Re-sequence the workflow: Redirect the 30-person mechanical team to the ID fan and steam drum work fronts (where parts and access are ready), moving the valve replacement to Day 3." },
            { id: "C", text: "Direct the contractor to tear down the old valve regardless, leaving the line open without a replacement on site." },
            { id: "D", text: "Instruct the contractor to perform general grounds maintenance around the plant." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Step 4 uses re-sequencing: when one task is blocked, redirect available manpower to parallel ready tasks (ID fan, drum access) to sustain productivity and eliminate standby penalties.\n\n• Why A is incorrect: Incurs heavy standby contractor fees without making outage progress.\n• Why C is incorrect: Opening lines without replacement parts risks internal contamination and violates work-boundary safety.\n• Why D is incorrect: Assigning specialized mechanical contractors to manual labor breaches contractual scope and invites vendor claims."
        },
        {
          id: "m3_q5",
          number: 5,
          lessonId: "3.2",
          lessonLabel: "Video 3.2",
          caseTitle: "Case 5: Role Reversal Insights and Critical Self-Reflection",
          scenario: "A junior CCR engineer complains: \"SCM and SSC create endless bureaucracy with their rigid part codes and paperwork.\"",
          question: "What core perspective from Video 3.2's Role Reversal Insights addresses this mindset?",
          choices: [
            { id: "A", text: "SCM and SSC intentionally create hurdles to assert departmental authority." },
            { id: "B", text: "SCM and SSC do not create arbitrary delays; they are bound by statutory audit regulations and shipping logistics. The critical question is: \"How many times did you coordinate with SCM BEFORE adjusting your outage sequence?\"" },
            { id: "C", text: "Operations is the primary business unit; supporting functions must adapt to unannounced changes without notice." },
            { id: "D", text: "Plant leadership should relocate SCM and SSC offices off-site to reduce interactions with the control room." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Encourages empathy and system-wide thinking: supporting functions operate under strict commercial audits and shipping schedules. Operators must proactively collaborate before changing technical execution plans.\n\n• Why A & C are incorrect: Reflect an isolated, defensive mindset that undermines One-Company collaboration.\n• Why D is incorrect: Suggests isolating teams rather than building cross-functional alignment."
        },
        // ====================================================================
        // VIDEO 3.3 CASES
        // ====================================================================
        {
          id: "m3_q6",
          number: 6,
          lessonId: "3.3",
          lessonLabel: "Video 3.3",
          caseTitle: "Case 1: Overcoming the Ebbinghaus Forgetting Curve",
          scenario: "An engineer scores 100/100 on an online compliance test, logs out, and assumes their learning commitments are complete.",
          question: "Under the Forgetting Curve and the 70-20-10 framework, what happens without deliberate on-site application?",
          choices: [
            { id: "A", text: "The knowledge remains fully preserved in long-term memory throughout their career." },
            { id: "B", text: "Approximately 75% of video-based information is forgotten within 48 hours; video training constitutes only the 10% Formal foundation, which must be reinforced via the A10 commitment and field Q-Card." },
            { id: "C", text: "The engineer is automatically promoted to Shift Supervisor based on test scores." },
            { id: "D", text: "The plant will automatically achieve its -50 Btu Heat Rate reduction target without further operational changes." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Unapplied theoretical knowledge decays rapidly under the Forgetting Curve. Video lessons cover only the 10% Formal foundation; sustained operational competence requires on-site execution (70% Experiential) via A10 commitments and Q-Cards.\n\n• Why A is incorrect: Human memory naturally degrades without active recall and structured field application.\n• Why C & D are incorrect: Static exam scores (Level 4) do not directly generate business results without active operational transfer."
        },
        {
          id: "m3_q7",
          number: 7,
          lessonId: "3.3",
          lessonLabel: "Video 3.3",
          caseTitle: "Case 2: Drafting the A10 Individual Action Plan",
          scenario: "Engineer Hoang is answering Question 4 of his A10 Action Plan: \"What will I do differently compared to past habits?\"",
          question: "Which response demonstrates concrete behavioral change aligned with a One-Company Mindset?",
          choices: [
            { id: "A", text: "\"I will try to arrive on time and avoid drinking coffee during my shift.\"" },
            { id: "B", text: "\"Instead of sending finger-pointing emails at 02:00 AM, I will convene a direct, 3-party SBAR radio or face-to-face dialogue whenever material anomalies arise.\"" },
            { id: "C", text: "\"I plan to work twice as hard as I did last year.\"" },
            { id: "D", text: "\"I will avoid communicating with warehouse personnel to prevent workplace friction.\"" }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Directly replaces a poor past practice (late-night defensive emails) with a verified collaborative behavior (SBAR-structured verbal dialogue).\n\n• Why A & C are incorrect: Vague declarations that lack actionable engineering standards.\n• Why D is incorrect: Severing communication worsens organizational silos and plant coordination failures."
        },
        {
          id: "m3_q8",
          number: 8,
          lessonId: "3.3",
          lessonLabel: "Video 3.3",
          caseTitle: "Case 3: Applying Q-Card Criterion 4 — Safety Courage",
          scenario: "Preparing to unbolt a boiler bottom drain line, an operator notices that the local pressure gauge needle reads 0.5 bar higher than the DCS display. The contractor argues: \"A 0.5 bar variance is within gauge tolerance. Let's open the flange so we don't fall behind schedule.\"",
          question: "How does the operator demonstrate Criterion 4 (Safety Courage) of the Q-Card?",
          choices: [
            { id: "A", text: "Follow the contractor's lead and unbolt the flange to preserve the handover schedule." },
            { id: "B", text: "Enforce Stop Work Authority: pause the task for 2 minutes to cross-check line conditions, blow down the gauge impulse line, and proceed only after verifying true atmospheric pressure." },
            { id: "C", text: "Abandon the boiler house area out of personal fear." },
            { id: "D", text: "Remove the local pressure gauge so the visual discrepancy is eliminated." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Criterion 4 measures Safety Courage via Stop Work Authority: stepping in when field readings drift to re-verify isolation before hazardous work proceeds.\n\n• Why A is incorrect: Bypassing verified Zero-Energy isolation risks flashing steam release and thermal injury.\n• Why C & D are incorrect: Unprofessional behaviors that compromise workplace safety and technical integrity."
        },
        {
          id: "m3_q9",
          number: 9,
          lessonId: "3.3",
          lessonLabel: "Video 3.3",
          caseTitle: "Case 4: Social Coaching (20%) via Shift Supervisor Q-Card Observations",
          scenario: "How do Shift Supervisors and Safety Specialists evaluate behavioral adoption using the Q-Card framework (Kirkpatrick Level 3)?",
          question: "How do Shift Supervisors and Safety Specialists evaluate behavioral adoption using the Q-Card framework (Kirkpatrick Level 3)?",
          choices: [
            { id: "A", text: "Require operators to sit for a weekly 60-minute written theory exam." },
            { id: "B", text: "Conduct regular on-shift field observations against the 4 Q-Card criteria, delivering structured feedback during routine Workday Touch Points." },
            { id: "C", text: "Install constant video surveillance in the CCR to deduct performance points." },
            { id: "D", text: "Hire external monitoring agencies to evaluate staff outside of work hours." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Represents standard 20% Social coaching: supervisors observe real-world performance against standardized Q-Card criteria and provide constructive coaching via Workday Touch Points.\n\n• Why A is incorrect: Written tests assess static recall (Level 4), failing to measure active field performance (Level 3).\n• Why C & D are incorrect: Pervasive surveillance damages psychological safety and undermines a transparent safety culture."
        },
        {
          id: "m3_q10",
          number: 10,
          lessonId: "3.3",
          lessonLabel: "Video 3.3",
          caseTitle: "Case 5: Connecting Field Actions to Strategic Outcomes (Kirkpatrick Level 4 - Results)",
          scenario: "When an operator completes digital logs within 15 minutes, verifies critical spare parts with SCM, and protects the 25-day Outage milestone, how does this drive top-tier business results (Kirkpatrick Level 4)?",
          question: "What primary operational and business outcome (Kirkpatrick Level 4) does this secure?",
          choices: [
            { id: "A", text: "It merely confirms the employee's eligibility for internal social club gifts." },
            { id: "B", text: "It ensures milestone delivery without Power Purchase Agreement (PPA) delay penalties, reduces fuel burn via the -50 Btu Heat Rate target, feeds clean data to plant AI agents, and reinforces Investors in People (IIP) Gold operational autonomy." },
            { id: "C", text: "It reduces routine hard-drive maintenance for the plant IT team." },
            { id: "D", text: "It enables the facility to sell power above approved tariff rates." }
          ],
          correctAnswer: "B",
          explanation: "Why B is correct: Links individual field habits directly to business outcomes: avoiding PPA liquidated damages, lowering emissions and coal costs via Heat Rate optimization (-50 Btu), fueling AI analytics with clean data, and sustaining IIP Gold organizational standards.\n\n• Why A & C are incorrect: Focus on trivial details that do not drive power plant financial or operational performance.\n• Why D is incorrect: PPA tariffs are governed by strict long-term commercial contracts and cannot be adjusted arbitrarily."
        }
      ]
    }
  },

  // ==========================================================================
  // FINAL COMPREHENSIVE EXAM: OPERATIONAL EXCELLENCE & VALUE-STREAM TRANSFER
  // (15 Questions: 10 Scenario MCQs [40 pts] + 5 Field Case Studies [60 pts])
  // Duration: 60 minutes | Total Points: 100 | Passing Threshold: ≥ 80%
  // ==========================================================================
  finalAssessmentData: {
    title: "FINAL COMPREHENSIVE EXAM: OPERATIONAL EXCELLENCE & VALUE-STREAM TRANSFER",
    subtitle: "Section 1: 10 Scenario MCQs (40 pts, 4 pts each) | Section 2: 5 Field Case Studies (60 pts, 12 pts each) | Passing Score: ≥ 80%",
    passingScorePercentage: 80,
    totalQuestions: 15,
    timeLimitMinutes: 60,
    targetAudience: "Control Room Operators, Shift Supervisors, Operations & Maintenance Engineers",
    maxPoints: 100,

    questions: [
      // ----------------------------------------------------------------------
      // SECTION 1: SCENARIO-BASED MULTIPLE CHOICE QUESTIONS (10 Questions, 4 pts each)
      // Suggested time: 15 minutes
      // ----------------------------------------------------------------------
      {
        id: "final_q1",
        number: 1,
        part: 1,
        type: "mcq",
        points: 4,
        moduleRef: "Module 1",
        scenario: "During the Mid-Year Touch Point review on Workday, 10–15% of engineers were rated as 'Developing' despite having achieved a perfect 100/100 score on standard safety and SOP exams.",
        question: "From the perspective of the LTEM model, what is the root cause of this discrepancy?",
        choices: [
          { id: "A", text: "Static multiple-choice exams only evaluate Level 4 (Knowledge Retention), whereas live shift operations require Level 7 (Transfer Decision-Making)." },
          { id: "B", text: "The engineers failed to fulfill minimum attendance requirements under Level 1 (Attendance)." },
          { id: "C", text: "Workday automatically forces a fixed curve percentage across operational staff." },
          { id: "D", text: "The engineers failed to actively participate during classroom lectures (Level 2)." }
        ],
        correctAnswer: "A",
        explanation: "Static multiple-choice exams solely measure knowledge retention (LTEM Level 4). Real-world power plant operations require transferring that knowledge into adaptive, real-time decision-making under stress and shifting plant conditions (LTEM Level 7)."
      },
      {
        id: "final_q2",
        number: 2,
        part: 1,
        type: "mcq",
        points: 4,
        moduleRef: "Module 2",
        scenario: "The station conducted an intensive post-overhaul Root Cause Analysis (RCA) to investigate critical path schedule overruns on Unit 1.",
        question: "According to the RCA report from the previous overhaul, what operator action directly caused the 6-hour equipment handover delay?",
        choices: [
          { id: "A", text: "Operators dropped and damaged a high-pressure flange gasket during staging." },
          { id: "B", text: "Operators batched all 45 spare part items into a single unranked file and submitted it to SCM immediately prior to shutdown." },
          { id: "C", text: "Operators failed to travel to the seaport to personally offload incoming international cargo." },
          { id: "D", text: "Operators sent the material requisition email with an incorrect subject line." }
        ],
        correctAnswer: "B",
        explanation: "Batching all 45 material items into a single unprioritized file and dumping it on SCM immediately before shutdown overwhelmed procurement officers, preventing staggered expediting and causing an acute 6-hour handover bottleneck."
      },
      {
        id: "final_q3",
        number: 3,
        part: 1,
        type: "mcq",
        points: 4,
        moduleRef: "Module 3",
        scenario: "Shift handover logs are being transitioned to digital tablets to eliminate ambiguity and prevent data mismatch across cross-functional teams.",
        question: "Under the data integrity guidelines in Video 1.3, what is the correct format for logging a boiler feed pump valve handover?",
        choices: [
          { id: "A", text: "Van-bom-1" },
          { id: "B", text: "BFP-01A-VALVE, with pressure in bar and temperature in °C" },
          { id: "C", text: "High-pressure feed valve with pressure recorded in psi" },
          { id: "D", text: "Pump-01-Feed-Valve recorded in kg/cm2" }
        ],
        correctAnswer: "B",
        explanation: "Zero-defect data integrity requires standard KKS nomenclature (BFP-01A-VALVE) with explicit standard SI units (bar and °C) to ensure full traceability and prevent cross-shift miscommunication."
      },
      {
        id: "final_q4",
        number: 4,
        part: 1,
        type: "mcq",
        points: 4,
        moduleRef: "Module 2",
        scenario: "Ahead of a 25-day outage, DCS indicates the boiler has cooled down to 60°C (meeting physical handover criteria), but the SCM inventory system shows that 2 high-pressure gasket codes remain marked as 'Pending Customs Clearance'.",
        question: "What should the console engineer do?",
        choices: [
          { id: "A", text: "Sign the handover immediately because the boiler reached its target thermal curve." },
          { id: "B", text: "Pause handover; execute a 3-dimensional assessment, evaluate the expected delay for both gasket sets, and prepare an aligned contingency path." },
          { id: "C", text: "Call warehouse staff to reprimand them for not working overnight shifts." },
          { id: "D", text: "Close the SCM inventory window to focus strictly on boiler drum pressure." }
        ],
        correctAnswer: "B",
        explanation: "Under the ADAPT Outage 3-Point Pre-check Matrix, handing over physical equipment while critical path replacement gaskets are missing locks the plant in expensive contractor standby fees. Pausing to evaluate customs clearance timelines and aligning with SCM is mandatory."
      },
      {
        id: "final_q5",
        number: 5,
        part: 1,
        type: "mcq",
        points: 4,
        moduleRef: "Module 2",
        scenario: "During an outage countdown, communication channels often experience friction and message delays between Operations, SCM, and Maintenance.",
        question: "What rule does the DISCUSS framework mandate for operational emergencies occurring within 12 hours of or during an outage?",
        choices: [
          { id: "A", text: "Compile detailed, multi-recipient defensive emails copying plant executives." },
          { id: "B", text: "Never use email for urgent matters within 12 hours; communicate exclusively face-to-face or via recorded plant radio." },
          { id: "C", text: "Withhold updates until the next formal weekly coordination meeting." },
          { id: "D", text: "Request HR representatives to mediate written disputes between departments." }
        ],
        correctAnswer: "B",
        explanation: "The DISCUSS framework strictly prohibits using asynchronous email within 12 hours of critical operations. Rapid closed-loop communication must be conducted face-to-face or over operational radio to eliminate ambiguity and defensive paper trails."
      },
      {
        id: "final_q6",
        number: 6,
        part: 1,
        type: "mcq",
        points: 4,
        moduleRef: "Module 2",
        scenario: "During boiler inspection, bottom blowdown valve V-BLW-01 is discovered to be cracked, threatening the restart schedule. The warehouse inventory shows that only model V-BLW-02 is in stock (identical ANSI 2500# rating, ASTM A182 F91 alloy, identical flange dimensions, and pre-approved technical parity).",
        question: "What is the proper Plan B response?",
        choices: [
          { id: "A", text: "Reject the component because the model suffix differs on the nameplate." },
          { id: "B", text: "Install V-BLW-02 immediately without updating technical change documentation." },
          { id: "C", text: "Verify Safe Operating Limit (SOL) boundaries, complete an Engineering Equivalence form, secure expedited approval, and proceed with installation." },
          { id: "D", text: "Perform an uncertified patch weld over the crack on the original valve body." }
        ],
        correctAnswer: "C",
        explanation: "Adaptive operational engineering uses formal engineering equivalence. Verifying Safe Operating Limits (SOL) and completing an expedited Engineering Equivalence form ensures complete safety compliance while keeping the outage on schedule."
      },
      {
        id: "final_q7",
        number: 7,
        part: 1,
        type: "mcq",
        points: 4,
        moduleRef: "Module 1",
        scenario: "A maintenance contractor supervisor approaches the control room under heavy schedule pressure and requests: 'Give us verbal handover now so we can start on time; you can bring the LOTO locks and logbook in an hour.'",
        question: "What must the engineer do?",
        choices: [
          { id: "A", text: "Agree to the verbal clearance to keep the outage milestone on schedule." },
          { id: "B", text: "Approve the request once the contractor signs an informal liability waiver." },
          { id: "C", text: "Trip an arbitrary nearby breaker and let the crew enter the workspace unverified." },
          { id: "D", text: "Firmly refuse; never permit verbal handovers or 'LOTO documentation debt,' as this directly introduces severe electrocution, mechanical, and fire hazards." }
        ],
        correctAnswer: "D",
        explanation: "Life-saving LOTO rules are non-negotiable. Verbal handovers and 'documentation debt' represent critical process safety violations that have historically caused fatal accidents in industrial facilities."
      },
      {
        id: "final_q8",
        number: 8,
        part: 1,
        type: "mcq",
        points: 4,
        moduleRef: "Module 2",
        scenario: "Operational trade-offs frequently arise where schedule pressure, financial budgets, and equipment lifespan pull engineers in competing directions.",
        question: "According to the Trade-off Triangle, what defines an acceptable operational decision?",
        choices: [
          { id: "A", text: "A decision that delivers individual shift targets ahead of schedule at any cost." },
          { id: "B", text: "A decision that optimizes plant-level outcomes rather than isolated shift performance." },
          { id: "C", text: "A decision that eliminates all quality testing to protect the financial budget." },
          { id: "D", text: "A decision that prioritizes contractor requests regardless of unit Heat Rate degradation." }
        ],
        correctAnswer: "B",
        explanation: "The Trade-off Triangle rejects siloed local optimization. A smart operational decision balances safety, cost, and schedule to achieve maximum value and asset integrity for the power station as a whole."
      },
      {
        id: "final_q9",
        number: 9,
        part: 1,
        type: "mcq",
        points: 4,
        moduleRef: "Module 2",
        scenario: "SCM confirms that replacement high-pressure valves are delayed by 2 days due to shipping issues. Meanwhile, Maintenance has 30 millwrights waiting at the control room door ready for work.",
        question: "What is the best Re-sequencing solution?",
        choices: [
          { id: "A", text: "Immediately reassign the 30 technicians to open the steam drum and overhaul ID fans (work fronts with materials ready), rescheduling the high-pressure valve scope to Day 3." },
          { id: "B", text: "Keep all 30 millwrights waiting on standby while absorbing hourly penalty charges." },
          { id: "C", text: "Direct workers to dismantle the existing valves even though replacements are unavailable." },
          { id: "D", text: "Lock the control room door to avoid complaints from maintenance supervisors." }
        ],
        correctAnswer: "A",
        explanation: "Adaptive re-sequencing prevents idle contractor burn rate. Moving manpower to parallel work fronts where materials are 100% staged keeps the overall overhaul critical path moving forward."
      },
      {
        id: "final_q10",
        number: 10,
        part: 1,
        type: "mcq",
        points: 4,
        moduleRef: "Module 1",
        scenario: "Engineers carry the field Q-Card to maintain behavioral alignment with the AES safety and operational excellence charter.",
        question: "How is 'Safety Courage' (Criterion 4) on the field Q-Card demonstrated during real-world operations?",
        choices: [
          { id: "A", text: "Performing manual valve-stroking operations faster than other operators." },
          { id: "B", text: "Out-debating other departments during post-incident reviews." },
          { id: "C", text: "Exercising Stop Work Authority for 2 minutes when parameters or part numbers deviate unexpectedly." },
          { id: "D", text: "Working back-to-back overtime shifts without breaks." }
        ],
        correctAnswer: "C",
        explanation: "Safety Courage is demonstrated by having the professional fortitude to call a 2-minute Pause (Stop Work Authority) the instant an anomaly, parameter drift, or part number discrepancy is detected."
      },

      // ----------------------------------------------------------------------
      // SECTION 2: FIELD SCENARIO CASE STUDIES (5 Questions, 12 pts each = 60 pts)
      // Constraints: Minimum 200 words, Maximum 1000 words
      // ----------------------------------------------------------------------
      {
        id: "final_q11",
        number: 11,
        part: 2,
        type: "case_study",
        points: 12,
        moduleRef: "Module 1",
        title: "Case 1: Turbine Journal Bearing Thermal Drift & LTEM Decision Transfer",
        minWords: 200,
        maxWords: 1000,
        scenario: "With 30 minutes left on shift, turbine journal bearing temperature reads 72°C (the standard SCADA alarm threshold is 75°C and the emergency trip limit is 85°C). Looking at the historian trend line, the value has climbed steadily from 61°C over the past 4 hours. A shift mate remarks: 'It is still in the green zone. If no alarm is ringing, there is no need to create extra work; let the next shift deal with it.'",
        question: "Learner Tasks:\n1. Critical Thinking (Mindset Evaluation): Identify the critical flaw in your shift mate's statement using the LTEM Level 4 (Knowledge Retention) versus LTEM Level 7 (Transfer Decision-Making) framework.\n2. Action Planning (Technical Protocol): Specify 3 concrete engineering actions you must execute before stepping out of the CCR to safeguard the incoming shift and prevent an unannounced trip.",
        rubric: [
          "Mindset Evaluation (LTEM): Differentiate LTEM Level 4 (passive memorization waiting for hard alarm thresholds) from LTEM Level 7 (proactive rate-of-change analysis and real-time operational decision transfer).",
          "Technical Action 1: Verify DCS trend telemetry (rate of temperature rise, lube oil supply pressure, cooler outlet temperature, bearing vibration spectrum).",
          "Technical Action 2: Mobilize field engineer for physical cross-checks (oil flow sight glass, casing acoustic inspection, thermal imaging gun reading).",
          "Technical Action 3: Prepare standby lube oil cooler / pump, record detailed drift data in digital handover log, and conduct face-to-face debrief with incoming shift supervisor."
        ],
        modelAnswer: "1. Critical Thinking (LTEM Mindset Evaluation):\nThe shift mate exhibits a classic LTEM Level 4 (Knowledge Retention) compliance trap. At Level 4, an operator passively memorizes static limits (75°C alarm, 85°C trip) and assumes that as long as parameters remain below these numerical thresholds, no action is required. However, high-reliability plant operations demand LTEM Level 7 (Transfer Decision-Making). At Level 7, the engineer understands the dynamics of heat transfer: an 11°C rise over 4 hours (2.75°C/hr) demonstrates acute thermal drift. Extrapolating this gradient, the bearing will breach the 75°C alarm within 65 minutes and risk turbine trip during the middle of the oncoming shift. Neglecting this drift passes an escalating crisis to colleagues, violating operational ownership.\n\n2. Concrete Technical Protocol (3 Mandatory Pre-Handover Actions):\n- Action 1 (Telemetry & Trend Diagnostics): Open the DCS turbine vibration and lube oil diagnostic page. Cross-check lube oil supply header pressure, oil temperature exiting coolers, and bearing vibration amplitude (overall RMS and 1X/2X harmonics) to distinguish between bearing babbitt wear, oil starvation, or cooler fouling.\n- Action 2 (Immediate Field Verification): Dispatch the field patrol engineer to the turbine deck to visually verify oil flow in the bearing sight glass, check differential pressure across lube oil duplex filters, inspect for oil leaks, and take an independent infrared thermal gun reading on the bearing housing.\n- Action 3 (Closed-Loop Handover & Mitigation): Place the standby lube oil plate cooler in pre-service readiness, log the exact thermal rate-of-change in the digital handover logbook, and conduct a dedicated face-to-face debrief with the incoming Shift Supervisor before leaving the control room."
      },
      {
        id: "final_q12",
        number: 12,
        part: 2,
        type: "case_study",
        points: 12,
        moduleRef: "Module 2",
        title: "Case 2: Main Steam Bypass Delay & Cross-Functional Bottleneck RCA",
        minWords: 200,
        maxWords: 1000,
        scenario: "During a major overhaul on a 1,242 MW unit, replacing main steam bypass valves is delayed by 8 hours, stalling international contractors and racking up thousands of dollars in standby fees. The console operator defends himself: 'I isolated the line at 08:00 sharp. If valves are missing, SCM is responsible for not stocking them in advance.'",
        question: "Learner Tasks:\n1. Root Cause Analysis (5 Whys): Construct the complete 5 Whys diagnostic chain showing how the 8-hour delay originated from the operator's Local Optimization Trap (focusing strictly on DCS actions while ignoring SCM lead times).\n2. Behavioral Transfer: State what specific action the operator should have taken at least 72 hours prior to Hour G (Shutdown) to prevent this bottleneck.",
        rubric: [
          "5 Whys Construction: Complete a rigorous 5 Whys diagnostic sequence tracing contractor delay back to the operator's local optimization silo mindset.",
          "Local Optimization Trap Analysis: Explain how focusing strictly on on-time valve isolation while ignoring procurement status damaged plant-level outage costs.",
          "Behavioral Transfer (72-Hour Pre-check): Identify the mandatory execution of the Outage 3-Point Pre-check Matrix (verifying physical parts staging 72 hours prior to shutdown).",
          "Cross-Functional Governance: Establish closed-loop physical verification with SCM and Maintenance leads before permit issuance."
        ],
        modelAnswer: "1. Root Cause Analysis (5 Whys Diagnostic Chain):\n- Why 1: Why were international contractor millwrights stalled for 8 hours? -> Because the replacement main steam bypass valves were not available at the equipment staging area when mechanical unbolting commenced.\n- Why 2: Why were the replacement valves not at the staging area? -> Because SCM had not received verified warehouse release confirmation or customs clearance validation for those specific valve serial numbers.\n- Why 3: Why was SCM unaware of the immediate need for these valves at 08:00? -> Because Operations isolated the steam line on schedule without cross-referencing whether the physical hardware was staged at the boiler deck.\n- Why 4: Why did Operations isolate the line without checking part staging? -> Because the console operator operated in a 'Local Optimization Trap', believing that executing DCS electrical and mechanical isolation at 08:00 sharp fulfilled his entire responsibility.\n- Why 5 (Root Cause): Why does this siloed mindset persist? -> Because the station lacked a closed-loop multi-departmental pre-check protocol requiring joint Operations, SCM, and Maintenance sign-off on material physical readiness prior to initiating the physical equipment handover.\n\n2. Behavioral Transfer (72-Hour Pre-Shutdown Protocol):\nAt least 72 hours prior to Hour G (unit shutdown), the console engineer must execute the Outage 3-Point Pre-check Matrix. This requires the engineer to walk down the physical warehouse and laydown yard with SCM Officer Nguyen Thi Lan and the Maintenance Lead to visually confirm that the main steam bypass valves, companion studs, and high-pressure gaskets are physically tagged, dimensionally verified, and staged on transport carts. If any customs clearance delays are detected, the engineer triggers the ADAPT protocol 72 hours early, allowing the team to reschedule contractor mobilization or re-sequence work fronts without incurring standby fees."
      },
      {
        id: "final_q13",
        number: 13,
        part: 2,
        type: "case_study",
        points: 12,
        moduleRef: "Module 2",
        title: "Case 3: Low-Pressure Turbine Valve Stem Fracture & Trade-off Triangle",
        minWords: 200,
        maxWords: 1000,
        scenario: "On Day 20 of the scheduled outage, the valve stem on the low-pressure turbine pressure-regulating valve assembly cracked. Two options were available:\nOption A: Transport the component via standard ground shipping. This incurred no additional logistics costs but took four days, delaying the outage schedule by 24 hours and resulting in a 400-million-VND penalty under the Power Purchase Agreement (PPA).\nOption B: Hire a dedicated express vehicle for overnight transport from the port. This immediately incurred 80 million VND in emergency supply chain management (SCM) costs but ensured the plant reconnected to the grid exactly on schedule, avoiding the PPA penalty. The shift supervisor hesitated, fearing that approving Option B would negatively impact their SCM cost performance rating.",
        question: "Learner Task:\nMake the correct decision based on the 'Trade-off Triangle' matrix. Justify your decision to the Board of Directors using the principle of optimizing plant-level outcomes.",
        rubric: [
          "Decision Selection: Unequivocally select Option B (80 million VND emergency express transport).",
          "Financial Cost-Benefit Justification: Quantify the net economic value (saving 400M VND PPA penalty with an 80M VND expenditure yields a net gain of 320M VND for the plant).",
          "Trade-off Triangle Application: Articulate how Schedule, Cost, and Risk balance in favor of grid reliability and overall corporate revenue.",
          "Overcoming Silo Mentality: Critique the Shift Supervisor's hesitation, showing how protecting a departmental SCM KPI damages corporate profitability."
        ],
        modelAnswer: "1. Operational Decision:\nI authorize Option B immediately: hire the dedicated express transport for 80 million VND to deliver the replacement low-pressure turbine valve stem overnight.\n\n2. Formal Justification to the Board of Directors (Optimizing Plant-Level Outcomes):\nFrom the perspective of the Trade-off Triangle (balancing Cost, Schedule, and Quality/Risk), operational decisions must be evaluated at the macro enterprise level rather than through the narrow lens of a single department's monthly budget.\n\nFinancial & Operational Analysis:\n- Option A Analysis: Preserves 80 million VND in the SCM logistics ledger but causes a 24-hour commercial outage overrun. Under our Power Purchase Agreement (PPA), missing the grid synchronization milestone imposes a contractual liquidated damage penalty of 400 million VND, plus unearned generation capacity revenue. The true net cost of Option A to the enterprise is 400 million VND.\n- Option B Analysis: Incurs an immediate emergency freight expense of 80 million VND, but protects the outage critical path, enabling on-time unit synchronization and completely avoiding the 400 million VND PPA penalty.\n- Net Economic Impact: Option B generates a net cash-flow preservation of 320 million VND (400M penalty avoided - 80M transport cost) for AES Mong Duong.\n\nOvercoming the Departmental Silo Trap:\nThe Shift Supervisor's hesitation stems from an insular departmental KPI trap—fearing that an 80 million VND logistics overrun on their scorecard will draw criticism, while ignoring the fourfold greater loss to corporate profit. Executive leadership values engineers who demonstrate enterprise stewardship: spending 80 million VND to save 400 million VND and protect grid stability is the definition of smart, value-maximizing operational decision-making."
      },
      {
        id: "final_q14",
        number: 14,
        part: 2,
        type: "case_study",
        points: 12,
        moduleRef: "Module 2",
        title: "Case 4: Outage 3-Point Pre-check Matrix & BFP-01A Digital Turnover",
        minWords: 200,
        maxWords: 1000,
        scenario: "Turnover is approaching for the overhaul of high-pressure Boiler Feed Pump BFP-01A during a 25-day outage window. The Operations Shift Supervisor opens the shift tablet to review the Outage 3-Point Pre-check Matrix before applying digital sign-offs.",
        question: "Learner Tasks:\n1. Multi-Dimensional Assessment Protocol: Define the mandatory passing criteria for each of the 3 Dimensions (Technical Parameters, Material Readiness, and Workforce Capacity) before the system allows a digital turnover sign-off.\n2. Contingency Decision-Making: If Dimension 1 and Dimension 3 are cleared (Green), but Dimension 2 displays a missing critical mechanical seal assembly (Red), state your exact action under the ADAPT protocol.",
        rubric: [
          "Dimension 1 Criteria (Technical Parameters): Complete thermal cooldown (<60°C), zero hydraulic pressure/drainage, electrical 6.6kV breaker racked out, LOTO verified.",
          "Dimension 2 Criteria (Material Readiness): 100% mechanical seal, casing gaskets, coupling pins, and QA certificates physically verified on staging cart.",
          "Dimension 3 Criteria (Workforce Capacity): Certified millwright crew on site, valid safety briefing, calibrated precision torque wrenches and alignment laser available.",
          "Contingency Action (ADAPT): Pause turnover sign-off immediately; do not permit unbolting; re-sequence millwrights to standby pump BFP-01B or motor lubrication front; expedite seal assembly with SCM."
        ],
        modelAnswer: "1. Multi-Dimensional Assessment Protocol (Mandatory 3-Dimension Criteria):\n- Dimension 1: Technical Parameters (Physical & Process Safety Isolation):\nThe pump casing must be fully depressurized, cooled below 60°C, and fully drained of high-pressure feedwater. The 6.6 kV motor breaker must be racked out, electrical supply de-energized, LOTO personal padlocks applied with zero-energy verification confirmed, and suction/discharge motorized valves locked and tagged.\n- Dimension 2: Material Readiness (BOM Physical Verification):\n100% of certified replacement parts must be physically present at the staging cart—specifically the primary mechanical cartridge seal assembly, balancing drum bush, high-pressure casing spiral-wound gaskets, and certified coupling fasteners with material test certificates (MTC).\n- Dimension 3: Workforce & Tooling Capacity (Competency Readiness):\nA certified mechanical pump overhaul crew must be present on site, certified under current AES Mong Duong plant safety clearances. All specialized tooling—including calibrated hydraulic tensioning equipment, laser shaft alignment tools, and calibrated torque wrenches—must have valid inspection tags.\n\n2. Contingency Decision-Making under ADAPT (Dimension 2 Red Status):\nWhen Dimension 2 is Red due to a missing mechanical seal assembly, the Shift Supervisor must immediately execute the ADAPT protocol:\n- Pause & Refuse Digital Turnover: Firmly refuse digital turnover sign-off. Never allow dismantling of a high-pressure pump until all internal wear assemblies are verified on site. Premature unbolting exposes the open pump casing to contamination and locks up the workspace.\n- Re-sequence Workforce: Coordinate with the Maintenance Lead to immediately reassign the pump overhaul crew to parallel work fronts with Green material status (e.g., Boiler Feed Pump BFP-01B lube oil flush or ID fan bearing inspection).\n- Coordinate with SCM: Contact SCM Officer Nguyen Thi Lan to track the expedited tracking number of the mechanical seal and set an agreed staging gate."
      },
      {
        id: "final_q15",
        number: 15,
        part: 2,
        type: "case_study",
        points: 12,
        moduleRef: "Module 3",
        title: "Case 5: Data Rules Diagnostic & Diamond Reflection for Handover Bottlenecks",
        minWords: 200,
        maxWords: 1000,
        scenario: "Your operating shift successfully isolated a high-pressure steam valve leak, but experienced a 35-minute maintenance handover delay due to non-standard KKS equipment shorthand that stalled SCM gasket verification.",
        question: "Learner Tasks:\n1. Three Data Rules Diagnostic: Identify which data rules were violated during the handover and explain how non-standard shorthand causes cross-functional 'Data Mismatch' between Operations, Maintenance, and SCM.\n2. Diamond Reflection Application: Complete the Sides of the Diamond (Friction) and Bottom of the Diamond (Critical Lesson) sections of the reflection tool to prevent recurring bottlenecks in subsequent shifts.",
        rubric: [
          "Three Data Rules Diagnostic: Identify Rule 1 (Standardized KKS Equipment Taxonomy), Rule 2 (Explicit Metric Units & Operational Parameters), Rule 3 (Traceable Linked Work Orders).",
          "Data Mismatch Mechanism: Explain how informal shorthand (e.g. 'Van-bom-1' or 'st-vlv-2') fails computerized search in SAP/Maximo and creates warehouse picking paralysis.",
          "Diamond Reflection - Sides (Friction): Document the 35-minute contractor idle time, inter-departmental frustration between Ops and SCM, and compromised shift schedule.",
          "Diamond Reflection - Bottom (Critical Lesson): Establish mandatory drop-down KKS validation in digital logbook, zero tolerance for verbal shorthand, and automated BOM cross-checking."
        ],
        modelAnswer: "1. Three Data Rules Diagnostic & Data Mismatch Mechanism:\nThe 35-minute handover delay resulted from the direct violation of three fundamental plant data integrity rules:\n- Rule 1 Violation (Standardized KKS Taxonomy): The shift used informal shorthand (e.g., writing 'Van-bom-1' or 'st-vlv-2') instead of the official station KKS code (e.g., 10LBA10AA001). In a modern computerized asset management system (SAP/Maximo), informal slang cannot be indexed. SCM warehouse officers searching for parts under non-standard shorthand find zero catalog matches.\n- Rule 2 Violation (Explicit Engineering Specifications): The entry omitted design pressure (bar) and temperature (°C) ratings, forcing SCM officers to manually search piping P&IDs to confirm whether ASME 1500# or 2500# spiral-wound gaskets were required.\n- Rule 3 Violation (Linked Work Order Traceability): The isolation log was not digitally linked to the active maintenance work order, forcing the maintenance supervisor to physically travel between the control room and warehouse to cross-reference paperwork.\nThis created a classic cross-functional 'Data Mismatch': Operations believed they communicated clearly, but SCM was paralyzed because procurement requires exact metallurgical part numbers.\n\n2. Diamond Reflection Tool Application:\n- Sides of the Diamond (Friction & Impact):\nThe operational friction included 35 minutes of lost critical path productivity, 12 maintenance contractors standing idle at hourly charge rates, elevated interpersonal tension between Operations and SCM, and delayed start of mechanical pipe cutting. Small documentation shortcuts create amplified downstream friction across department boundaries.\n- Bottom of the Diamond (Critical Lesson Learned):\nStandardized data is an operational life-safety and productivity prerequisite, not mere administrative bureaucracy. Moving forward: 1) Shift digital logbooks must enforce mandatory auto-complete KKS code validation—preventing free-form shorthand submission; 2) SCM and Operations must conduct joint pre-isolation digital verification; and 3) All handovers must link directly to the SAP work package to ensure zero-defect material alignment."
      }
    ]
  }
};

