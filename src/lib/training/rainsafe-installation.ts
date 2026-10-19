/* ============================================================================
 * RAINSAFE TANK INSTALLATION — MODULE CONTENT
 *
 * Same shape as manual-handling.ts: edit the text between the quote marks and
 * the module updates.
 *
 *   slides    — one screen each. `graphic` names a scene in
 *               src/lib/training/scenes-rainsafe.ts.
 *               The `image` line points at a photo in public/media/rainsafe/;
 *               delete it and the drawn scene comes back.
 *   questions — `answer` is the position of the correct option, counting from
 *               0. So `answer: 2` means the third option is correct.
 *
 * The wording is taken from the RainSafe installation narration script. It is
 * a demonstration build: check every figure and instruction against the
 * current RainSafe Installation Guide and the CSTB-ATec document before this
 * is used as real training.
 * ========================================================================== */

import type { Section } from './manual-handling.ts';

export const MODULE = {
  title: 'RainSafe Tank Installation',
  subtitle:
    'How to unload, excavate, line, build and backfill a RainSafe stormwater attenuation tank.',
  duration: '30 minutes',
  passMark: 16,
  disclaimer:
    'Sample module for demonstration, built from the RainSafe installation narration script. ' +
    'It does not replace the RainSafe Installation Guide, the CSTB-ATec document or the ' +
    'pre-installation briefing, and any deviation from these steps must be approved by CubicM3.',
};

export const SECTIONS: Section[] = [
  /* ==================================================== 1. BEFORE YOU START */
  {
    id: 'before-you-start',
    title: 'Before you start',
    slides: [
      {
        title: 'Welcome',
        graphic: 'welcome',
        image: '/media/rainsafe/01-welcome.jpg',
        alt: 'A completed RainSafe tank under a finished car park, shown in cutaway',
        body: [
          'Congratulations on selecting RainSafe for your stormwater management system.',
          'Your tank has been designed to provide the required storage volume, design flow-rate, loading capacities, maintainability and primary water requirements.',
          'This module takes about 30 minutes and follows the installation from the delivery lorry to the final geotextile. There are twenty questions along the way, and you need 16 out of 20 to pass.',
        ],
      },
      {
        title: 'Why the guidelines matter',
        graphic: 'why-guidelines',
        image: '/media/rainsafe/02-why-the-guidelines-matter.jpg',
        alt: 'A cracked chamber beside an intact one',
        body: [
          'Failure to adhere to these guidelines may result in damage to the chambers, and in inadequate hydraulic or structural performance of the tank.',
          'The tank is buried. Once the stone and the surface are on top of it, nothing inside is visible and nothing is easy to reach.',
          'Remediation after backfilling has been carried out is costly and time-consuming.',
        ],
        callout: 'Every mistake on this job is cheap to fix before the stone goes in, and expensive afterwards.',
      },
      {
        title: 'Who needs to know this',
        graphic: 'crew-briefing',
        image: '/media/rainsafe/03-who-needs-to-know-this.jpg',
        alt: 'A site team gathered around a drawing, one signing a record sheet',
        body: [
          'For the requirements to be met and the tank to be certified, all installers and machine operators involved in the installation must be familiar with the guidelines.',
          'They must agree to strictly follow the instructions, and provide a record of having done so.',
          'That record is part of the certification of the tank, not a formality to be caught up on later.',
        ],
      },
      {
        title: 'These are minimum requirements',
        graphic: 'minimum-requirements',
        image: '/media/rainsafe/04-these-are-minimum-requirements.jpg',
        alt: 'A drawing marked with minimum dimensions',
        body: [
          'These guidelines are general, and provide the minimum requirements for correct installation of your system.',
          'The project drawings may ask for more than the minimum. Where they do, the drawings govern.',
          'Any deviation from the steps and measures detailed in this guide, whether because of site-specific constraints or any other requirement, must be approved by CubicM3.',
        ],
        callout: 'A site constraint is a reason to ring CubicM3, not a reason to improvise.',
      },
      {
        title: 'The pre-installation briefing',
        graphic: 'pre-briefing',
        image: '/media/rainsafe/05-the-pre-installation-briefing.jpg',
        alt: 'A CubicM3 representative talking a crew through the guidelines on site',
        body: [
          'A CubicM3 or RainSafe representative will provide a pre-installation briefing to run through these guidelines.',
          'The briefing is where to raise anything the drawings do not cover: awkward levels, restricted access, unusual traffic loading, or a sequence that does not suit the programme.',
          'Bring questions to it. It is much cheaper than finding the answer halfway through backfilling.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'When does putting a mistake right become costly and time-consuming?',
        options: [
          'Once the chambers have been unloaded from the lorry',
          'Once backfilling has been carried out',
          'Once the drawings have been issued for construction',
          'Once the tank liner has been unrolled',
          'Once the site photos have been posted on LinkedIn',
        ],
        answer: 1,
        why:
          'Remediation after backfilling is costly and time-consuming. Up to that point the chambers are visible and reachable; after it, putting anything right means taking the stone back out.',
      },
      {
        prompt: 'Site constraints mean you cannot achieve the spacing shown on the drawings. What do you do?',
        options: [
          'Use your judgement and keep as close to the drawing as the site allows',
          'Get the deviation approved by CubicM3 before proceeding',
          'Record it in the site diary and carry on',
          'Reduce the spacing only on the rows nobody will see',
          'Build it slightly wrong and hope the stone sorts it out',
        ],
        answer: 1,
        why:
          'Any deviation from these steps and measures, for site-specific constraints or anything else, must be approved by CubicM3. The guidelines are the minimum requirement for the tank to perform and be certified.',
      },
    ],
  },

  /* ================================================ 2. UNLOADING THE CHAMBERS */
  {
    id: 'unloading',
    title: 'Unloading the chambers',
    slides: [
      {
        title: 'Delivery on pallets',
        graphic: 'delivery',
        image: '/media/rainsafe/06-delivery-on-pallets.jpg',
        alt: 'A flatbed lorry carrying palletised stacks of RainSafe chambers',
        body: [
          'Your RainSafe chambers will arrive at the site on pallets.',
          'The chambers have been designed to pack efficiently, to minimise storage space requirements and to protect the chambers in transit and in the stockpile.',
          'They should remain on their pallets until they are ready for installation.',
        ],
      },
      {
        title: 'Unloading the pallets',
        graphic: 'fork-extenders',
        image: '/media/rainsafe/07-unloading-the-pallets.jpg',
        alt: 'A telehandler with fork extenders lifting a tall pallet of chambers',
        body: [
          'Pallets should be unloaded carefully, using fork-extenders where necessary.',
          'The stacks are deeper than a standard set of forks. Without extenders the load is carried on the tips, which is how pallets get dropped.',
          'Banding straps should only be removed just before installation.',
        ],
        callout: 'The straps are what holds a tall stack together. Cut them early and the stack is no longer a stack.',
      },
      {
        title: 'Tall, heavy and easy to topple',
        graphic: 'level-ground',
        image: '/media/rainsafe/08-tall-heavy-and-easy-to-topple.jpg',
        alt: 'A pallet stack standing square on level ground beside one leaning on soft ground',
        body: [
          'The palletised stacks are tall and heavy.',
          'The pallets should be placed on flat, level ground to avoid the risk of toppling. Soft or sloping ground under one corner is enough to start a stack moving.',
          'When unloading chambers, they should be lifted off the stack carefully by at least two operatives.',
        ],
      },
      {
        title: 'Never push, never topple',
        graphic: 'never-push',
        image: '/media/rainsafe/09-never-push-never-topple.jpg',
        alt: 'A crossed-out illustration of a chamber being pushed off the top of a stack',
        body: [
          'The chambers should never be pushed off the top of the stack.',
          'Stacks should never be pushed over to make unloading quicker.',
          'Doing either could cause serious injury or even death, and result in significant damage to the chambers.',
        ],
        callout: 'Chambers are light enough to lift and large enough to kill someone when they fall from height.',
      },
    ],
    questions: [
      {
        prompt: 'When should the banding straps come off a pallet of chambers?',
        options: [
          'As soon as the lorry arrives, so the driver can take the straps away',
          'Just before installation',
          'Once the pallet has been set down on level ground',
          'At the end of the first shift, whatever stage the work has reached',
          'Whenever somebody finds the knife',
        ],
        answer: 1,
        why:
          'Banding straps should only be removed just before installation. Until then they are the only thing holding a tall, heavy stack together.',
      },
      {
        prompt: 'How should a chamber be taken off the top of a stack?',
        options: [
          'Pushed off and caught at ground level',
          'Lifted off carefully by at least two operatives',
          'Pulled off with a sling from the excavator',
          'Slid off the back of the stack onto the bedding stone',
          'Encouraged off with a long stick and a short prayer',
        ],
        answer: 1,
        why:
          'Chambers are lifted off the stack carefully by at least two operatives. They are never pushed off the top, and stacks are never pushed over — either can cause serious injury or death and will damage the chambers.',
      },
    ],
  },

  /* ===================================================== 3. TANK EXCAVATION */
  {
    id: 'excavation',
    title: 'Tank excavation',
    slides: [
      {
        title: 'Excavate to the drawings',
        graphic: 'excavate',
        image: '/media/rainsafe/10-excavate-to-the-drawings.jpg',
        alt: 'An excavator forming a rectangular tank bed, with level pegs set out',
        body: [
          'Excavate the tank bed to the dimensions and levels shown in the drawings, and prepare the sub-grade.',
          'The dimensions include the working space around the rows, not just the footprint of the chambers themselves.',
          'Levels matter as much as plan size: the whole tank is built off this surface.',
        ],
      },
      {
        title: 'Check the sub-grade',
        graphic: 'subgrade',
        image: '/media/rainsafe/11-check-the-sub-grade.jpg',
        alt: 'An engineer testing the bearing capacity of an excavated formation',
        body: [
          'The quality and bearing capacity of the sub-grade must be inspected and confirmed to meet design requirements.',
          'What counts as adequate depends on the expected traffic loading above the tank and on the total cover depth over it.',
          'Refer to the RainSafe CSTB-ATec document for detailed guidance.',
        ],
        callout: 'Inspected and confirmed, not assumed. The whole structure is carried by this formation.',
      },
      {
        title: 'Ground improvement',
        graphic: 'ground-improvement',
        image: '/media/rainsafe/12-ground-improvement.jpg',
        alt: 'A soft patch of formation being dug out and replaced with compacted stone',
        body: [
          'At this stage, ground improvement measures should be taken where necessary.',
          'This is the moment for it. Once the liner and the bedding stone are down, improving the ground underneath means taking the tank back apart.',
          'What is required will come from the design: the inspection of the formation decides whether it is needed.',
        ],
      },
      {
        title: 'Protect the liner',
        graphic: 'sharp-objects',
        image: '/media/rainsafe/13-protect-the-liner.jpg',
        alt: 'A sharp stone being lifted out of the formation, with fine bedding material alongside',
        body: [
          'Any protruding sharp objects should be removed to protect the tank liner.',
          'Rock, old services, reinforcement and broken concrete all puncture a liner under load, and the puncture is not found until the tank is in service.',
          'If necessary, a protective layer of fine bedding material should be placed prior to installation of the liner.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'Which document gives detailed guidance on sub-grade quality and bearing capacity?',
        options: [
          'The RainSafe CSTB-ATec document',
          'The delivery docket for the chambers',
          'Table 2 of the RainSafe Installation Guide',
          'The Clause 505 stone specification',
          'Whichever folder is nearest the kettle',
        ],
        answer: 0,
        why:
          'The CSTB-ATec document carries the detailed guidance on the sub-grade, assessed against the expected traffic loading and the total cover depth. Table 2 of the Installation Guide is a different thing: it governs plant working above the tank.',
      },
      {
        prompt: 'Why are protruding sharp objects removed from the excavation?',
        options: [
          'To make it easier to get levels with the laser',
          'To protect the tank liner',
          'To stop the bedding stone being contaminated',
          'To allow the chambers to sit flat on the formation',
          'Because they look untidy in the handover photographs',
        ],
        answer: 1,
        why:
          'Sharp objects puncture the liner, and the puncture is not discovered until the tank is in service. Where removing them is not enough, a protective layer of fine bedding material goes down before the liner.',
      },
    ],
  },

  /* =================================================== 4. PLACING THE LINER */
  {
    id: 'liner',
    title: 'Placing the tank liner',
    slides: [
      {
        title: 'Laying the liner',
        graphic: 'liner-spreader',
        image: '/media/rainsafe/14-laying-the-liner.jpg',
        alt: 'A roll of liner being unrolled across a tank bed from a spreader beam',
        body: [
          'Place a non-woven geotextile or impermeable liner over the prepared tank bed, as specified for your tank.',
          'Use of a spreader beam is highly recommended. It keeps the roll level and takes the drag off the material as it comes off.',
          'Dragging a liner across a formation is how it picks up damage and how it ends up out of position.',
        ],
      },
      {
        title: 'Wrinkles and overlaps',
        graphic: 'wrinkles',
        image: '/media/rainsafe/15-wrinkles-and-overlaps.jpg',
        alt: 'A flat lapped joint beside a wrinkled one marked with a cross',
        body: [
          'Avoid wrinkles, and ensure minimum joint overlaps are maintained.',
          'A wrinkle is a fold that concentrates load and gives stone a point to work against.',
          'An overlap that has crept below the minimum is a joint that will open under fill.',
        ],
        callout: 'Flat and fully lapped before any stone goes on. It cannot be corrected later.',
      },
      {
        title: 'Under-drains',
        graphic: 'underdrain',
        image: '/media/rainsafe/16-under-drains.jpg',
        alt: 'A perforated under-drain laid along the base of the lined tank',
        body: [
          'Install the under-drain or drains, as per the tank design.',
          'Position, fall and connection all come from the design drawings for your tank.',
          'Note where they run. They are the one thing in the base that the bedding stone and the plant placing it can damage.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'What is highly recommended when placing the tank liner?',
        options: [
          'A vibrating roller to bed it down',
          'A spreader beam',
          'Mechanical fixing to the excavation walls',
          'A layer of bedding stone over it within the hour',
          'Six people and a strong breeze',
        ],
        answer: 1,
        why:
          'A spreader beam keeps the roll level and takes the drag off the material, so the liner goes down flat and in position rather than being hauled across the formation.',
      },
      {
        prompt: 'Which pair of defects must be avoided in the liner?',
        options: [
          'Wrinkles, and overlaps below the minimum',
          'Wrinkles, and liner that extends beyond the excavation',
          'Dust on the surface, and joints that are too wide',
          'Overlaps, and contact with the under-drain',
          'Creases, and the wrong shade of grey',
        ],
        answer: 0,
        why:
          'Wrinkles concentrate load and give stone something to work against; an overlap below the minimum is a joint that opens under fill. Extra overlap and extra liner are not defects.',
      },
    ],
  },

  /* ================================================ 5. THE BEDDING STONE */
  {
    id: 'bedding-stone',
    title: 'Placing the bedding stone',
    slides: [
      {
        title: 'Only one kind of stone',
        graphic: 'stone-spec',
        image: '/media/rainsafe/17-only-one-kind-of-stone.jpg',
        alt: 'Clean angular stone beside rounded and dusty material marked with crosses',
        body: [
          'Only clean, crushed, angular stone may be used within the tank.',
          'It should conform to Clause 505 Type B, or Remblai 20-40 specification.',
          'Rounded stone rolls instead of locking. Dirty or fine material blocks the voids the tank relies on to store and move water.',
        ],
        callout: 'Clean, crushed, angular. Anything else changes both the structure and the storage.',
      },
      {
        title: 'Place and compact',
        graphic: 'bedding-place',
        image: '/media/rainsafe/18-place-and-compact.jpg',
        alt: 'Bedding stone being spread and compacted across the lined tank bed',
        body: [
          'Place and compact the bedding stone.',
          'This is the layer the chambers sit on, so it is compacted before any chamber is set out on it.',
          'Work it up evenly across the bed rather than in one corner at a time.',
        ],
      },
      {
        title: 'Depth to the design',
        graphic: 'bedding-depth',
        image: '/media/rainsafe/19-depth-to-the-design.jpg',
        alt: 'A staff measuring the depth of the bedding layer against a marked level',
        body: [
          'The depth of bedding stone must be as per the design drawings, and should reach the minimum depth.',
          'Check it across the bed, not at one point. A bed that is right at the edges and shallow in the middle is not a level bed.',
          'If the formation needed improvement, confirm the depth again over the improved ground.',
        ],
      },
      {
        title: 'Equipment and under-drains',
        graphic: 'bedding-plant',
        image: '/media/rainsafe/20-equipment-and-under-drains.jpg',
        alt: 'A tracked machine placing bedding stone, keeping clear of a marked under-drain',
        body: [
          'There is no restriction on the type of equipment used for the placement of the bedding stone.',
          'The restriction on plant comes later, once the chambers are in and the fill is going on around them.',
          'However, take care to avoid crushing or otherwise damaging the under-drain or drains.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'Which stone may be used within the tank?',
        options: [
          'Any well-graded granular fill that compacts readily',
          'Clean, crushed, angular stone to Clause 505 Type B or Remblai 20-40',
          'Rounded washed gravel, 20 to 40 millimetres',
          'Recycled crushed concrete, provided it is screened on site',
          'Whatever is already stockpiled at the gate',
        ],
        answer: 1,
        why:
          'Only clean, crushed, angular stone to Clause 505 Type B or Remblai 20-40 may be used within the tank. Angular stone locks together to form the structure; clean stone keeps the voids open for storage and flow.',
      },
      {
        prompt: 'What restricts the equipment used to place the bedding stone?',
        options: [
          'Nothing restricts the type of equipment, but the under-drains must not be damaged',
          'Only tracked plant under five tonnes may be used',
          'The restrictions in Table 2 of the Installation Guide apply from this point on',
          'Stone may only be placed by hand until the minimum depth is reached',
          'Only machines the operator is genuinely fond of',
        ],
        answer: 0,
        why:
          'There is no restriction on the type of equipment for the bedding stone — but the under-drains must not be crushed or damaged. The Table 2 restrictions apply later, to plant working above the chambers.',
      },
    ],
  },

  /* ================================================== 6. THE SEPARATOR ROW */
  {
    id: 'separator-row',
    title: 'The Separator Row',
    slides: [
      {
        title: 'Mark out the rows',
        graphic: 'mark-out',
        image: '/media/rainsafe/21-mark-out-the-rows.jpg',
        alt: 'Chamber row positions marked out in line on the bedding stone',
        body: [
          'Mark chamber row positions out clearly on the bedding stone.',
          'Marking every row before the first chamber lands is what keeps the spacing between rows right across the whole tank.',
          'It is far easier to correct a line on the stone than a row of connected chambers.',
        ],
      },
      {
        title: 'Start with the Separator Rows',
        graphic: 'separator-start',
        image: '/media/rainsafe/22-start-with-the-separator-rows.jpg',
        alt: 'A plan of the tank with the Separator Rows highlighted against the inlet manholes',
        body: [
          'Installation of the RainSafe chambers begins with the Separator Rows, which connect to the inlet manholes.',
          'The Separator Row takes the incoming flow, so it sets the position of everything built off it.',
          'Build these first and the rest of the tank follows from them.',
        ],
      },
      {
        title: 'The woven geotextile bed',
        graphic: 'woven-bed',
        image: '/media/rainsafe/23-the-woven-geotextile-bed.jpg',
        alt: 'A strip of woven geotextile laid along the marked line of the Separator Row',
        body: [
          'The woven geotextile bed is laid out in the correct position, along the line marked for the Separator Row.',
          'Woven, not non-woven: this is the strip the Separator Row is built on, and it is specified for strength.',
          'Position it against the marks before any chamber goes on it.',
        ],
      },
      {
        title: 'Continuous, flat, no wrinkles',
        graphic: 'continuous-strip',
        image: '/media/rainsafe/24-continuous-flat-no-wrinkles.jpg',
        alt: 'A single continuous strip running the full length of a row',
        body: [
          'A continuous strip must be provided for the full length of the Separator Row.',
          'This must be flat and free of wrinkles.',
          'Continuous means exactly that: not a run of short pieces laid end to end under the chambers.',
        ],
      },
      {
        title: 'The 300 millimetre margin',
        graphic: 'margin-300',
        image: '/media/rainsafe/25-the-300-millimetre-margin.jpg',
        alt: 'The geotextile extending a marked 300 millimetres past the edge of a chamber',
        body: [
          'Sufficient length and width must be provided to ensure the geotextile extends a minimum of 300 millimetres beyond the side edges and ends of the Separator Row chambers and end caps.',
          'The stone placed on that margin later is what holds the geotextile in place.',
          'That is what allows the Separator Row to be jetted and maintained over the life of the tank without pulling the bed out from under it.',
        ],
        callout: 'The 300 millimetre margin is a maintenance detail, not a tolerance. It is why the tank can be cleaned.',
      },
      {
        title: 'First chamber and end cap',
        graphic: 'first-chamber',
        image: '/media/rainsafe/26-first-chamber-and-end-cap.jpg',
        alt: 'The first chamber of a row set down with its end cap in place',
        body: [
          'The first chamber and end cap of the Separator Row are then placed in position.',
          'Set them to the marks. The whole row, and the rows built off it, follow this first unit.',
          'Check the position before connecting anything to it.',
        ],
      },
      {
        title: 'Cutting the inlet',
        graphic: 'inlet-cut',
        image: '/media/rainsafe/27-cutting-the-inlet.jpg',
        alt: 'An end cap being cut on its moulded guide with a reciprocating saw',
        body: [
          'Following the cutting guides on the end cap, cut a hole for the inlet pipe using a reciprocating saw.',
          'The inlet hole invert should always be at the bottom of the end cap.',
          'Insert the corrugated inlet pipe, ensuring a minimum of 300 millimetres protrudes into the chamber.',
        ],
        callout: 'Invert at the bottom, and 300 millimetres of pipe inside the chamber.',
      },
      {
        title: 'Building out the row',
        graphic: 'connect-chambers',
        image: '/media/rainsafe/28-building-out-the-row.jpg',
        alt: 'Two chambers being joined, large corrugation over small, with locating buttons aligned',
        body: [
          'Build out the Separator Row, following the direction guides shown on the tops of the chambers.',
          'Fit the large end-corrugations over the smaller end-corrugations on the other end of the chamber.',
          'To ensure a firm connection, slot the locating buttons into the corresponding sockets. Repeat this for the entire length of each row.',
        ],
      },
      {
        title: 'The overflow bypass end',
        graphic: 'bypass-cut',
        image: '/media/rainsafe/29-the-overflow-bypass-end.jpg',
        alt: 'An end cap cut at the top to receive the overflow bypass pipe',
        body: [
          'The end cap at the far end is cut to receive the overflow bypass pipe at the top of the end cap.',
          'Top, not bottom: the bypass only takes flow once the tank is full, which is the opposite of the inlet.',
          'The end cap is then placed to close off the Separator Row.',
        ],
      },
      {
        title: 'Cover the Separator Row',
        graphic: 'cover-separator',
        image: '/media/rainsafe/30-cover-the-separator-row.jpg',
        alt: 'Non-woven geotextile being laid over the full length of a completed Separator Row',
        body: [
          'A layer of non-woven geotextile is placed over the entire length of the Separator Row.',
          'Non-woven over the top; woven underneath. The two do different jobs and are not interchangeable.',
          'Entire length means end cap to end cap, with no gaps left open to the stone above.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'How far must the woven geotextile extend beyond the Separator Row chambers and end caps?',
        options: [
          'A minimum of 150 millimetres',
          'A minimum of 300 millimetres',
          'A minimum of 500 millimetres',
          'Far enough to reach the side walls of the excavation',
          'About a shovel-length, give or take',
        ],
        answer: 1,
        why:
          'A minimum of 300 millimetres beyond the side edges and the ends. The stone placed on that margin holds the geotextile in place, which is what allows the Separator Row to be maintained later.',
      },
      {
        prompt: 'Where should the invert of the inlet hole be cut in the end cap?',
        options: [
          'At the top of the end cap',
          'At the bottom of the end cap',
          'At the mid-height of the end cap',
          'At whatever level the incoming pipe arrives',
          'Wherever the saw ends up, it all fills eventually',
        ],
        answer: 1,
        why:
          'The inlet hole invert should always be at the bottom of the end cap. The overflow bypass is the opposite: that is cut at the top of the end cap at the far end of the row.',
      },
      {
        prompt: 'How do two chambers connect to each other?',
        options: [
          'The smaller end-corrugations fit over the larger ones, and the joint is taped',
          'The larger end-corrugations fit over the smaller ones, and the locating buttons slot into their sockets',
          'The chambers butt together and are held by the stone placed around them',
          'The ends are cut square and joined with a coupler',
          'Firmly, and with a good deal of shouting',
        ],
        answer: 1,
        why:
          'Large end-corrugations fit over the small ones, following the direction guides on the tops of the chambers, and the locating buttons slot into the corresponding sockets to make the connection firm.',
      },
      {
        prompt: 'What goes over the completed Separator Row?',
        options: [
          'A second strip of woven geotextile',
          'A layer of non-woven geotextile over its entire length',
          'Nothing — the stone is placed directly on the chambers',
          'An impermeable liner over the chambers and end caps',
          'A tarpaulin, until somebody needs it for something else',
        ],
        answer: 1,
        why:
          'Non-woven geotextile goes over the entire length of the Separator Row. Woven material is the bed underneath it; the two are specified for different jobs.',
      },
    ],
  },

  /* =============================================== 7. BUILD OUT THE TANK */
  {
    id: 'build-out',
    title: 'Building out the tank',
    slides: [
      {
        title: 'The remaining rows',
        graphic: 'remaining-rows',
        image: '/media/rainsafe/31-the-remaining-rows.jpg',
        alt: 'Several completed chamber rows running parallel across the tank bed',
        body: [
          'By connecting adjacent chambers, build out the remaining rows.',
          'The same connection applies throughout: direction guides followed, large corrugations over small, locating buttons home.',
          'Then cap off all rows with an end cap.',
        ],
      },
      {
        title: 'Overflow bypasses',
        graphic: 'bypass-assembly',
        image: '/media/rainsafe/32-overflow-bypasses.jpg',
        alt: 'Bypass pipework being assembled between rows at the end of the tank',
        body: [
          'Cut-outs for overflow bypasses should be made, and bypass pipes assembled and connected.',
          'Make the cut-outs to the drawings for your tank: the bypass arrangement is part of the hydraulic design, not a site detail.',
          'Check every connection before the stone goes near it.',
        ],
      },
      {
        title: 'Spacing is structural',
        graphic: 'row-spacing',
        image: '/media/rainsafe/33-spacing-is-structural.jpg',
        alt: 'A cross-section showing stone columns between chamber rows carrying load',
        body: [
          'Take care to ensure that the spacing between rows matches the design.',
          'The stone columns between chamber rows form an essential part of the overall structure. It is therefore essential for the structural integrity of the tank that, in all cases, at least the minimum required separation between chambers is achieved or exceeded.',
          'Similarly, the correct spacing between the edges of rows and the side walls of the excavation must be ensured.',
        ],
        callout: 'The gaps between the rows are not spare ground. They are columns, and they carry the tank.',
      },
    ],
    questions: [
      {
        prompt: 'Why does the spacing between chamber rows matter so much?',
        options: [
          'It gives access for jetting the chambers later',
          'The stone columns between the rows form an essential part of the structure',
          'It allows water to move between rows at the design flow-rate',
          'It keeps the rows straight while they are being built out',
          'It leaves somewhere to stand while you work',
        ],
        answer: 1,
        why:
          'The stone columns between the rows are structural. The minimum separation must be achieved or exceeded in all cases, and the same care applies to the spacing between the outer rows and the excavation side walls.',
      },
      {
        prompt: 'The rows are built slightly closer together than the design shows, to fit within the excavation. Is that acceptable?',
        options: [
          'Yes, provided the total storage volume is still achieved',
          'No — at least the minimum required separation must be achieved or exceeded in all cases',
          'Yes, if extra stone is compacted into the gaps that remain',
          'Yes, provided it is only on the outer rows',
          'Yes, nobody measures it once the stone is in',
        ],
        answer: 1,
        why:
          'In all cases, at least the minimum separation must be achieved or exceeded, because those stone columns carry the structure. If the excavation will not allow it, that is a deviation for CubicM3 to approve, not a site decision.',
      },
    ],
  },

  /* ================================================= 8. STONE FILL AROUND */
  {
    id: 'stone-fill',
    title: 'Stone fill around the chambers',
    slides: [
      {
        title: 'Why this stone matters',
        graphic: 'fill-why',
        image: '/media/rainsafe/34-why-this-stone-matters.jpg',
        alt: 'A cutaway of chambers surrounded by angular stone, with load arrows through it',
        body: [
          'Only clean, crushed, angular stone may be used within the tank. It should conform to Clause 505 Type B, or Remblai 20-40 specification.',
          'The stone around the chambers provides a critical function for both the structural and the hydraulic performance of the tank.',
          'It is therefore essential to adhere to these guidelines for stone placement. Failure to do so may result in underperformance, damage or failure of the tank.',
        ],
      },
      {
        title: 'Lock the chambers in',
        graphic: 'fill-spine',
        image: '/media/rainsafe/35-lock-the-chambers-in.jpg',
        alt: 'Stone being placed along the spine of a row and dropping between rows',
        body: [
          'Place the initial fill stone carefully along the spine of each row, allowing it to drop between rows.',
          'This locks the chambers in place and prevents movement during filling.',
          'Until the chambers are locked in, anything placed against one side can push it off line.',
        ],
      },
      {
        title: 'Fill from the ends',
        graphic: 'fill-ends',
        image: '/media/rainsafe/36-fill-from-the-ends.jpg',
        alt: 'A machine placing stone from the end of the excavation, working parallel to the rows',
        body: [
          'Once the chambers are locked in, place the fill stone from the ends of the tank excavation.',
          'Filling must proceed parallel to the rows.',
          'Stone must only be placed, never dumped, on top of the tank.',
        ],
        callout: 'Placed, not dumped. A dropped load arrives as an impact, not as fill.',
      },
      {
        title: 'Warning: plant above the chambers',
        graphic: 'warning-plant',
        image: '/media/rainsafe/37-warning-plant-above-the-chambers.jpg',
        alt: 'A warning sign over a machine working above a partly filled tank',
        body: [
          'Equipment may only operate above the chambers strictly as per the guidelines.',
          'Those guidelines are set out later in this section and in Table 2 of the RainSafe Installation Guide.',
          'Until the stated minimum cover has been reached, mechanical equipment has no business on top of the tank.',
        ],
      },
      {
        title: 'Keep it balanced',
        graphic: 'fill-balanced',
        image: '/media/rainsafe/38-keep-it-balanced.jpg',
        alt: 'Even fill either side of a chamber beside uneven fill pushing one over',
        body: [
          'When placing stone, ensure that backfill around the chambers is placed evenly, to avoid exerting unbalanced, excessive lateral loading on the chambers.',
          'Stone heaped against one side of a row and not the other pushes the row sideways.',
          'That could cause displacement, or compromise the structural capacity of the completed tank.',
        ],
      },
      {
        title: 'The 300 millimetre level rule',
        graphic: 'level-300',
        image: '/media/rainsafe/39-the-300-millimetre-level-rule.jpg',
        alt: 'Adjacent rows being brought up together, with the level difference marked',
        body: [
          'Stone fill between chamber rows and at the edges of the tank must be brought up evenly with the rest of the tank.',
          'Ensure that the difference in levels from one row to the next never exceeds 300 millimetres.',
          'Bring the whole tank up together rather than completing one bay at a time.',
        ],
        callout: 'Never more than 300 millimetres of difference between one row and the next.',
      },
      {
        title: 'Compaction between the rows',
        graphic: 'no-compaction',
        image: '/media/rainsafe/40-compaction-between-the-rows.jpg',
        alt: 'Angular stone shown locking together between two chamber rows',
        body: [
          'It is not necessary to compact stone between the chamber rows.',
          'Angular stone placed carefully locks as it is placed. That is what the specification is for.',
          'Running plant over the tank to compact it is a far bigger risk than leaving it as placed.',
        ],
      },
      {
        title: 'Warning: 150 millimetres of cover',
        graphic: 'cover-150',
        image: '/media/rainsafe/41-warning-150-millimetres-of-cover.jpg',
        alt: 'A marked 150 millimetre layer of stone over the top of the chambers',
        body: [
          'Mechanical equipment may only be permitted above the tank once a minimum cover of 150 millimetres over the top of the chambers has been reached.',
          'Even then, only strictly in accordance with the instructions in Table 2 of the RainSafe Installation Guide. That guidance is based on vehicle and axle weights.',
          'It is important to avoid excessive forces resulting from sudden acceleration or deceleration when manoeuvring above the tank.',
        ],
        callout: 'No plant on the tank below 150 millimetres of cover. Above it, only what Table 2 allows.',
      },
      {
        title: 'Geotextile at Top Water Level',
        graphic: 'top-water-level',
        image: '/media/rainsafe/42-geotextile-at-top-water-level.jpg',
        alt: 'Woven geotextile being lapped across the top of the filled tank',
        body: [
          'Once the fill stone reaches Top Water Level, woven geotextile is to be placed over the tank.',
          'Minimum overlaps are required between adjacent strips, and with the side-wall geotextile.',
          'Check the laps before the cover material goes on. This is the last chance to see them.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'When may mechanical equipment operate above the tank?',
        options: [
          'Once the chambers have been locked in by the initial fill stone',
          'Once a minimum cover of 150 millimetres over the top of the chambers has been reached, and then only as Table 2 allows',
          'Once the fill stone has reached Top Water Level',
          'Once the woven geotextile has been laid over the tank',
          'Once the machine is already up there and it would be awkward to reverse',
        ],
        answer: 1,
        why:
          'A minimum of 150 millimetres of cover over the top of the chambers, and then strictly in accordance with Table 2 of the RainSafe Installation Guide, which works from vehicle and axle weights.',
      },
      {
        prompt: 'What is the maximum difference in fill level allowed from one row to the next?',
        options: [
          '150 millimetres',
          '300 millimetres',
          '500 millimetres',
          'One full chamber height',
          'Whatever the loading shovel manages in a pass',
        ],
        answer: 1,
        why:
          'The difference in levels from one row to the next must never exceed 300 millimetres. Fill between the rows and at the edges is brought up evenly with the rest of the tank.',
      },
      {
        prompt: 'Which statement about stone around the chambers is correct?',
        options: [
          'Stone may be dumped on top of the tank once the chambers are locked in',
          'Stone must only be placed, never dumped, and it is not necessary to compact stone between the rows',
          'Stone between the rows must be compacted in layers before the next lift',
          'Filling should proceed at right angles to the rows, from the side of the excavation',
          'Stone should be tipped in quickly, before anyone notices the level difference',
        ],
        answer: 1,
        why:
          'Stone is placed, never dumped, and filling proceeds parallel to the rows from the ends of the excavation. Angular stone locks as it is placed, so compaction between the rows is not necessary.',
      },
    ],
  },

  /* ======================================================= 9. FINISHING UP */
  {
    id: 'finishing',
    title: 'Finishing up',
    slides: [
      {
        title: 'What good practice protects',
        graphic: 'closing-performance',
        image: '/media/rainsafe/43-what-good-practice-protects.jpg',
        alt: 'A finished surface above a completed tank, shown in cutaway',
        body: [
          'Following these guidelines ensures optimal performance and the structural integrity of your tank.',
          'Every rule in this module protects one of two things: the structure that carries the load above, or the voids that store and move the water.',
          'Both are set during installation and neither can be adjusted afterwards.',
        ],
      },
      {
        title: 'Records and certification',
        graphic: 'records',
        image: '/media/rainsafe/44-records-and-certification.jpg',
        alt: 'A completed installation record being signed off on site',
        body: [
          'The record that installers and machine operators are familiar with the guidelines and agree to follow them is part of the tank being certified.',
          'Keep it with the project records, along with the drawings the tank was built to and any deviation approved by CubicM3.',
          'If something was approved as a deviation, the approval belongs in the file beside the record.',
        ],
      },
      {
        title: 'Everyone’s responsibility',
        graphic: 'closing',
        image: '/media/rainsafe/45-everyones-responsibility.jpg',
        alt: 'A site crew at the end of a completed installation',
        body: [
          'Thank you for taking the time to learn about the installation process for your RainSafe stormwater management system.',
          'Most of what goes wrong with a buried tank is decided by people who were doing their best with the wrong instruction.',
          'Remember, safety and compliance are everyone’s responsibility.',
        ],
      },
    ],
    questions: [
      {
        prompt: 'What does the installers’ and operators’ record of familiarity with the guidelines support?',
        options: [
          'The health and safety file only',
          'Certification of the tank',
          'The warranty on the chambers against transit damage',
          'The hydraulic design calculations',
          'The end-of-job barbecue invitation list',
        ],
        answer: 1,
        why:
          'For the requirements to be met and the tank to be certified, everyone involved must be familiar with the guidelines, agree to follow them, and provide a record of it.',
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
