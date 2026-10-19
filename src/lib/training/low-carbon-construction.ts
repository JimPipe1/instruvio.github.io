/* ============================================================================
 * CUTTING CARBON IN CONSTRUCTION — MODULE CONTENT
 *
 * Same shape as manual-handling.ts: edit the text between the quote marks and
 * the module updates.
 *
 *   slides    — one screen each. `graphic` names a scene in
 *               src/components/training/Illustration.astro.
 *               Add an `image` line to use a real photo instead.
 *   questions — `answer` is the position of the correct option, counting from
 *               0. So `answer: 2` means the third option is correct.
 *
 * Figures are sourced and dated in the slide text. Check them against the
 * latest EPA, UNEP and Government publications before this is used as real
 * training — these numbers move every year.
 * ========================================================================== */

import type { Section } from './manual-handling.ts';

export const MODULE = {
  title: 'Cutting Carbon in Construction',
  subtitle:
    'How design teams, contractors and site crews can reduce greenhouse gas emissions on a building project.',
  duration: '20 minutes',
  passMark: 8,
  disclaimer:
    'Sample module for demonstration. Figures are from published sources and dated in the text; ' +
    'policy and procurement requirements change, so verify against current guidance before relying on them.',
};

export const SECTIONS: Section[] = [
  /* ================================================ 1. WHY IT MATTERS */
  {
    id: 'why',
    title: 'Why it matters',
    slides: [
      {
        title: 'Welcome',
        graphic: 'welcome-carbon',
        alt: 'A building under construction beside a wind turbine',
        body: [
          'Construction is one of the largest sources of greenhouse gas emissions there is, and most of the decisions that set those emissions are made early, by people who never see a site.',
          'This module covers where the carbon actually sits in a project, what Irish policy now requires, and the practical moves that cut emissions in design, procurement and on site.',
          'It takes about 20 minutes. There are ten questions along the way, and you need 8 out of 10 to pass.',
        ],
      },
      {
        title: 'Two kinds of carbon',
        graphic: 'two-carbons',
        alt: 'A factory and lorry on one side, a heated building on the other',
        body: [
          'Embodied carbon is everything emitted making the building: extracting and manufacturing materials, transporting them, building with them, maintaining them and eventually demolishing them.',
          'Operational carbon is everything emitted using the building: heating, cooling, lighting and power.',
          'Together they are the building’s whole-life carbon. As buildings get better insulated and the grid gets cleaner, embodied carbon becomes the bigger share of the two.',
        ],
        callout: 'You cannot retrofit embodied carbon away. It is spent the day the building goes up.',
      },
      {
        title: 'The scale of it',
        graphic: 'scale-stats',
        alt: 'Three large percentage figures',
        body: [
          'Globally, buildings account for 32% of energy use and 34% of energy-related CO2 emissions, with materials like cement and steel responsible for 18% of that total (UNEP Global Status Report 2024/2025).',
          'In Ireland, the built environment is estimated at roughly 37% of national greenhouse gas emissions, with embodied carbon alone around 14%.',
          'Irish cement production emitted 2.48 MtCO2eq in 2024, about 4.6% of national emissions.',
        ],
      },
      {
        title: 'Whole-life carbon, A to C',
        graphic: 'lifecycle',
        alt: 'A timeline split into product, construction, use and end-of-life stages',
        body: [
          'EN 15978 splits a building’s life into modules, and the language turns up in every carbon assessment you will be asked for.',
          'A1 to A3, the product stage: extraction, transport to factory, manufacture. Usually the biggest single block.',
          'A4 to A5, construction: delivery to site, and site activity itself. B, the use stage: maintenance, repair, replacement. C, end of life: demolition, transport, disposal.',
        ],
      },
      {
        title: 'Where the carbon sits',
        graphic: 'where-carbon',
        alt: 'A building section with the structure and substructure highlighted',
        body: [
          'On most projects the A1 to A3 product stage dominates embodied carbon, and within it a handful of materials do most of the damage: concrete, steel, aluminium and insulation.',
          'Concrete alone accounts for between 30% and 50% of materials-related emissions in construction in Ireland.',
          'Site activity (A5) is far smaller, typically a few percent — which does not make it unimportant, but does tell you where the leverage is.',
        ],
        callout: 'Chase the tonnes, not the gestures. A specification change beats a hundred switched-off lights.',
      },
      {
        title: 'What Irish policy requires',
        graphic: 'policy',
        alt: 'Policy documents with a calendar',
        body: [
          'The Climate Action Plan commits to reducing embodied carbon in construction materials produced and used in Ireland by at least 30%, against a national target of 51% emissions reduction by 2030.',
          'Government guidance on public procurement sets a direction of travel: whole-life carbon assessment at design stage, carbon disclosure statements on major projects, a minimum level of clinker replacement in concrete, and PAS 2080 carbon management on larger contracts.',
          'If you work on public projects, these arrive as tender requirements long before they arrive as law.',
        ],
      },
      {
        title: 'What gets measured',
        graphic: 'epd',
        alt: 'An Environmental Product Declaration document under a magnifier',
        body: [
          'An EPD (Environmental Product Declaration) is a verified statement of a product’s environmental impact, produced to EN 15804. It is the number you build an assessment from.',
          'No EPD means no evidence. A supplier’s brochure claim is not the same thing as a verified declaration.',
          'Ask for EPDs at tender stage, not after the order is placed, and keep them with the project records.',
        ],
      },
      {
        title: 'Section summary',
        graphic: 'summary',
        alt: 'A checklist with a tick',
        body: [
          'Whole-life carbon is embodied plus operational; embodied carbon is locked in on day one.',
          'Buildings are roughly a third of global emissions, and materials are the biggest slice of the embodied part.',
          'Irish policy is moving from encouragement to procurement requirement.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'Which of these is embodied carbon rather than operational carbon?',
        options: [
          'The gas burned by the building’s boiler in January',
          'The emissions from manufacturing the cement in the frame',
          'The electricity used by the lifts',
          'The building’s cooling load in a heatwave',
          'The collective sighing of the occupants',
        ],
        answer: 1,
        why:
          'Manufacturing materials is module A1 to A3, the product stage, and it is the largest part of most buildings’ embodied carbon. Everything else on that list is energy used in operation.',
      },
      {
        prompt: 'Roughly what share of materials-related construction emissions in Ireland comes from concrete?',
        options: [
          'Under 5%',
          'Around 10%',
          'Between 30% and 50%',
          'Over 90%',
          'None — concrete is famously weightless',
        ],
        answer: 2,
        why:
          'Government analysis cites 30 to 50% of materials-related emissions in Irish construction. That is why clinker replacement and mix design carry so much weight in procurement guidance.',
      },
    ],
  },

  /* ================================================ 2. DESIGN & MATERIALS */
  {
    id: 'design',
    title: 'Design & materials',
    slides: [
      {
        title: 'The carbon hierarchy',
        graphic: 'hierarchy',
        alt: 'Four steps: build nothing, build less, build clever, build efficiently',
        body: [
          'Build nothing. Challenge the brief. Can the need be met without new construction at all?',
          'Build less. Reuse what is there, refurbish rather than replace, and build only what the brief actually requires.',
          'Build clever. Design efficient structures and specify lower-carbon materials.',
          'Build efficiently. Cut waste in manufacture and on site.',
        ],
        callout: 'The order matters. Every step down the list saves less than the one above it.',
      },
      {
        title: 'Build nothing, build less',
        graphic: 'refurb',
        alt: 'An existing building being refurbished rather than demolished',
        body: [
          'Retaining an existing structure typically saves most of the embodied carbon of a new one, because the substructure and frame are already paid for in carbon terms.',
          'Ask early whether the floor area is really needed, whether existing space can work harder, and whether the foundations and frame can be retained and adapted.',
          'These questions are almost free at concept stage and impossible by the time the piling rig arrives.',
        ],
      },
      {
        title: 'Right-size the structure',
        graphic: 'right-size',
        alt: 'Two structural options side by side, the leaner one marked with a tick',
        body: [
          'Structural efficiency is one of the cheapest carbon savings available: shorter spans, rationalised grids, thinner slabs, fewer transfer structures.',
          'Challenge default load allowances and over-conservative assumptions — they compound through the whole frame and into the foundations.',
          'Ground conditions matter too: a lighter building needs less substructure, and substructure is nearly all concrete.',
        ],
      },
      {
        title: 'Lower-carbon concrete',
        graphic: 'concrete',
        alt: 'A concrete mixer and a cement bag showing clinker replacement',
        body: [
          'The carbon in concrete is overwhelmingly in the cement clinker, so the main lever is replacing some of it.',
          'GGBS (ground granulated blast-furnace slag) and fly ash are permitted as clinker replacements under Irish standards, and public procurement guidance sets a minimum level of replacement for public projects.',
          'Specify by performance and allow longer strike times where you can: high-replacement mixes gain strength more slowly, so the programme has to accommodate the choice.',
        ],
        callout: 'Talk to the concrete supplier at design stage, not the week before the pour.',
      },
      {
        title: 'Steel and metals',
        graphic: 'steel',
        alt: 'A steel beam with recycling arrows',
        body: [
          'Steel made in an electric arc furnace from scrap carries a fraction of the carbon of primary steel from a blast furnace. Ask which one you are buying.',
          'Reused steel sections carry almost none, and the market for them is growing.',
          'Aluminium is the one to watch in facades: it is extremely energy intensive, and the difference between smelters running on hydro and on coal is enormous.',
        ],
      },
      {
        title: 'Timber and bio-based materials',
        graphic: 'timber',
        alt: 'A cross-laminated timber panel and a growing tree',
        body: [
          'Timber, hemp, cellulose and other bio-based materials generally carry much lower embodied carbon, and store carbon while in use.',
          'The benefit depends on the forest being genuinely replanted and the material staying in service, so certification and end-of-life matter.',
          'Fire, acoustic, moisture and insurance constraints are real and need designing for rather than wishing away.',
        ],
      },
      {
        title: 'Specify with evidence',
        graphic: 'specify',
        alt: 'A specification document being checked against product data',
        body: [
          'Write carbon into the specification: EPD required, maximum embodied carbon per unit, minimum recycled or replacement content.',
          'Compare like with like — an EPD is only comparable if the declared unit and the modules covered are the same.',
          'Record what was actually supplied. A carbon assessment based on the design, not the delivery, is a work of fiction.',
        ],
      },
      {
        title: 'Design for the end',
        graphic: 'dfma',
        alt: 'Prefabricated panels being installed, with bolted connections',
        body: [
          'Bolted and mechanical connections can be taken apart; glued, welded and composite ones usually cannot.',
          'Standard sizes and off-site manufacture cut offcuts, rework and wasted deliveries.',
          'Keep a record of what is in the building — the materials passport of today is the demolition survey of 2070.',
        ],
      },
      {
        title: 'Section summary',
        graphic: 'summary',
        alt: 'A checklist with a tick',
        body: [
          'Work down the hierarchy: build nothing, build less, build clever, build efficiently.',
          'Concrete, steel, aluminium and insulation are where the tonnes are.',
          'Specify with EPDs and record what was actually installed.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'A client asks for a new office beside an empty one they already own. What does the carbon hierarchy suggest you do first?',
        options: [
          'Design the new building with a timber frame',
          'Ask whether the existing building can be refurbished to meet the need',
          'Specify a high-GGBS concrete mix for the new frame',
          'Offset the new building’s emissions',
          'Build both and let the market decide',
        ],
        answer: 1,
        why:
          'Build nothing and build less sit above material choice. Retaining an existing structure usually saves far more than any specification change on a new one — and the other options are all still available afterwards.',
      },
      {
        prompt: 'What is the main way of reducing the embodied carbon of concrete?',
        options: [
          'Replacing some of the cement clinker with GGBS or fly ash',
          'Using a darker pigment so it absorbs less heat',
          'Pouring it faster',
          'Adding more water to the mix',
          'Whispering encouragement to the mixer driver',
        ],
        answer: 0,
        why:
          'Almost all the carbon in concrete is in the cement clinker. Replacement materials such as GGBS and fly ash cut it directly — at the cost of slower strength gain, which the programme must allow for.',
      },
    ],
  },

  /* ================================================ 3. ON SITE */
  {
    id: 'site',
    title: 'On site',
    slides: [
      {
        title: 'What site controls',
        graphic: 'site-overview',
        alt: 'A site compound with plant, cabins and deliveries',
        body: [
          'Site activity is a small share of whole-life carbon, but it is the share the contractor controls directly and is measured on.',
          'Four things account for most of it: plant and generators, site accommodation, transport, and waste.',
          'All four respond to planning rather than heroics.',
        ],
      },
      {
        title: 'Power the site properly',
        graphic: 'grid-vs-genset',
        alt: 'A grid connection beside a diesel generator',
        body: [
          'A temporary grid connection almost always beats running diesel generators, and Ireland’s grid gets cleaner every year while a generator does not.',
          'Apply for the connection early — lead times, not cost, are what push sites onto diesel.',
          'Where generators are unavoidable, size them for the actual load. A generator running at 15% load burns fuel to produce very little.',
        ],
        callout: 'The cheapest site kilowatt-hour is the one you never generate on site.',
      },
      {
        title: 'Plant: right size, right power',
        graphic: 'plant',
        alt: 'An electric excavator on charge beside a diesel one',
        body: [
          'Electric and hybrid plant now covers much of the smaller end — telehandlers, excavators, dumpers, hoists, tower cranes.',
          'Right-size the machine to the task: an oversized excavator burns more fuel to do the same work.',
          'Maintain what you have. Poorly serviced plant burns more and fails more.',
        ],
      },
      {
        title: 'Idling and operator habits',
        graphic: 'idling',
        alt: 'An engine and a clock, showing time spent idling',
        body: [
          'Idling is the easiest saving on any site: engines running through breaks, during waits, while parked.',
          'Set an idling policy, put it in the induction, and give supervisors permission to enforce it.',
          'Telematics on modern plant will tell you exactly how much idle time you are paying for.',
        ],
      },
      {
        title: 'Fuels',
        graphic: 'fuel',
        alt: 'A fuel bowser with a certificate',
        body: [
          'Where diesel cannot be avoided, HVO can cut tailpipe emissions substantially, but only if the feedstock is genuinely waste-derived — ask for certification and chain of custody.',
          'Treat alternative fuels as a bridge, not a destination. Electrification is the direction.',
          'Watch the paperwork: fuel duty and carbon tax treatment change, and the cost case changes with it.',
        ],
      },
      {
        title: 'Transport and logistics',
        graphic: 'transport',
        alt: 'Delivery lorries and a consolidation plan',
        body: [
          'Consolidate deliveries, load vehicles fully, and plan so material does not arrive before there is somewhere to put it.',
          'Source locally where the product is comparable — but remember transport (A4) is usually small next to manufacture (A1 to A3). Local high-carbon material is still high-carbon.',
          'Plan crew travel too: parking, shuttle buses and shift timing change the site’s total footprint more than most people expect.',
        ],
      },
      {
        title: 'Site accommodation',
        graphic: 'cabins',
        alt: 'Site cabins with insulation, LED lighting and a meter',
        body: [
          'Cabins run 24 hours a day for the length of the job, so small fixes compound: insulated units, LED lighting, timers and thermostats, doors that close.',
          'Meter the compound separately so you can see what it costs. Unmetered is unmanaged.',
          'Switch off what is not needed at night and at weekends, and check that it stays off.',
        ],
      },
      {
        title: 'Materials on site',
        graphic: 'materials-site',
        alt: 'Stacked materials under cover beside a small waste skip',
        body: [
          'Over-ordering, damage and double handling all turn into wasted embodied carbon, which is the expensive kind.',
          'Store materials properly, protect them from weather, and order to the sequence rather than to the lorry.',
          'Get the concrete pour right first time: a failed pour is the most carbon-intensive mistake available on most sites.',
        ],
      },
      {
        title: 'Section summary',
        graphic: 'summary',
        alt: 'A checklist with a tick',
        body: [
          'Grid before generators, right-sized plant, and no idling.',
          'Meter the compound, insulate the cabins, switch things off.',
          'Protect materials — wasted material is wasted embodied carbon.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'A site is drawing all its power from diesel generators. What usually cuts emissions most?',
        options: [
          'Painting the generators a lighter colour',
          'Getting a temporary grid connection in place, applied for early',
          'Running the generators at night when it is cooler',
          'Adding a second generator so each works less hard',
          'Hiding the generators behind the hoarding so nobody counts them',
        ],
        answer: 1,
        why:
          'Grid electricity is far cleaner than on-site diesel and gets cleaner each year. Lead time is the usual blocker, which is why the application belongs in the pre-construction programme.',
      },
      {
        prompt: 'Which of these gives the largest carbon saving on a typical project?',
        options: [
          'Switching the site cabins to LED lighting',
          'Reducing the cement clinker content in the frame’s concrete',
          'Consolidating deliveries in the final fit-out weeks',
          'Turning off plant during lunch breaks',
          'Composting the tea bags in the canteen',
        ],
        answer: 1,
        why:
          'All of these are worth doing, but material choice is a different order of magnitude. Site activity is typically a few percent of whole-life carbon; the frame is a large share of the embodied total.',
      },
      {
        prompt: 'What should you ask for before accepting HVO as a lower-carbon fuel?',
        options: [
          'A discount for bulk purchase',
          'Certification of the feedstock and chain of custody',
          'Confirmation that it smells different',
          'A guarantee it will not void the plant warranty',
          'Nothing — the name has "vegetable" in it somewhere',
        ],
        answer: 1,
        why:
          'HVO’s benefit depends entirely on what it is made from and whether that can be traced. Warranty confirmation is worth having too, but it is not what makes the carbon claim credible.',
      },
    ],
  },

  /* ================================================ 4. WASTE & MEASUREMENT */
  {
    id: 'measure',
    title: 'Waste & measurement',
    slides: [
      {
        title: 'The waste picture',
        graphic: 'waste-stats',
        alt: 'Sorted skips beside a figure for national construction waste',
        body: [
          'Ireland generated 7.85 million tonnes of construction and demolition waste in 2024, down from 9.04 million tonnes in 2023 (EPA).',
          '81% of non-hazardous C&D waste excluding soil and stones was recycled, ahead of the EU’s 70% target.',
          'Soil and stones dominate the total, and most of it goes to backfilling.',
        ],
      },
      {
        title: 'Prevention beats recycling',
        graphic: 'waste-hierarchy',
        alt: 'The waste hierarchy from prevention down to disposal',
        body: [
          'Recycling a material still loses most of the energy that went into making it. Not needing it in the first place loses none.',
          'Design to standard sizes, order to the cutting list, and sequence deliveries so material is not damaged in storage.',
          'A high recycling rate on a wasteful project is still a wasteful project.',
        ],
        callout: 'Every skip is a receipt for carbon you already paid for.',
      },
      {
        title: 'Segregate properly',
        graphic: 'segregate',
        alt: 'Separate skips for timber, metal, plasterboard and general waste',
        body: [
          'Mixed skips get sorted badly or not at all. Separate streams recover more and cost less.',
          'Label bins clearly, put them where the work happens, and cover the point in induction.',
          'Plasterboard, timber, metals, packaging and inert material all have routes — use them.',
        ],
      },
      {
        title: 'Reuse before recycling',
        graphic: 'reuse',
        alt: 'Reclaimed steel sections and bricks set aside for reuse',
        body: [
          'Reclaimed steel sections, bricks, slates, raised floors and even whole facades are being reused on real projects.',
          'It takes early survey work, storage space and a client willing to accept variation in appearance.',
          'On a demolition, survey for reuse before you survey for waste.',
        ],
      },
      {
        title: 'Measure what you manage',
        graphic: 'measure',
        alt: 'A dashboard showing fuel, energy and waste figures',
        body: [
          'Track fuel by type, site electricity, waste by stream and material quantities as delivered.',
          'PAS 2080 is the common framework for managing carbon across the value chain, and increasingly a contractual requirement on larger public work.',
          'Set a baseline and a target at the start. Measurement without a target is just record-keeping.',
        ],
      },
      {
        title: 'Report honestly',
        graphic: 'report-carbon',
        alt: 'A carbon report with supporting evidence attached',
        body: [
          'Carbon disclosure statements and whole-life assessments are only as good as their evidence: EPDs, delivery records, fuel logs, waste dockets.',
          'Record assumptions and gaps rather than hiding them. Assessors trust a stated assumption far more than a suspiciously round number.',
          'Keep the data in a form the next project can learn from.',
        ],
      },
      {
        title: 'Hand over a building that performs',
        graphic: 'handover',
        alt: 'A completed building with its energy meter and manuals',
        body: [
          'Commission properly and check the building performs as designed — the gap between predicted and actual energy use is often large.',
          'Hand over usable information: controls that people understand, manuals someone will read, meter locations.',
          'Poor handover turns a low-carbon design into an ordinary building within a year.',
        ],
      },
      {
        title: 'What to do on Monday',
        graphic: 'actions',
        alt: 'A short action list on a clipboard',
        body: [
          'Ask for EPDs on the next three materials you specify or order.',
          'Check whether a grid connection is in the programme, and when it was applied for.',
          'Put idling and waste segregation into the next site induction.',
          'Find out who on your project owns the carbon number — and if nobody does, that is the finding.',
        ],
        callout: 'This module is an overview, not a substitute for a project carbon assessment by a competent assessor.',
      },
    ],
    questions: [
      {
        prompt: 'Why is preventing waste better than recycling it?',
        options: [
          'Recycling is illegal on most sites',
          'Recycling still loses most of the energy and emissions already spent making the material',
          'Recycled materials are always weaker',
          'Skips are expensive to hire',
          'Because the recycling bin is usually further away',
        ],
        answer: 1,
        why:
          'The embodied carbon is already spent by the time material reaches site. Recycling recovers some value but not that investment, which is why prevention sits at the top of the hierarchy.',
      },
      {
        prompt: 'Which set of records best supports a carbon disclosure statement?',
        options: [
          'A marketing brochure from each supplier',
          'EPDs, delivery records, fuel logs and waste dockets',
          'The designer’s original estimate, unchanged',
          'A photograph of the finished building',
          'A strongly worded sustainability policy',
        ],
        answer: 1,
        why:
          'Verified declarations plus records of what was actually delivered, burned and disposed of. An assessment based on the design rather than the as-built reality will not survive scrutiny.',
      },
      {
        prompt: 'Your project will retain an existing frame, use a high-GGBS mix, and run the site on a grid connection. Which has the biggest effect on whole-life carbon?',
        options: [
          'The grid connection',
          'The high-GGBS mix',
          'Retaining the existing frame',
          'They are all roughly equal',
          'The one that photographs best for the tender document',
        ],
        answer: 2,
        why:
          'Retaining a structure avoids the emissions of a new one entirely — substructure and frame are usually the largest single block of embodied carbon. The mix change reduces what is left; the grid connection reduces a smaller slice again.',
      },
    ],
  },
];

/** Every question in order, used for the final score. */
export const ALL_QUESTIONS = SECTIONS.flatMap((section) =>
  section.questions.map((question) => ({ ...question, section: section.title })),
);

export const TOTAL_SLIDES = SECTIONS.reduce((n, s) => n + s.slides.length, 0);
export const TOTAL_QUESTIONS = ALL_QUESTIONS.length;
