export type ProjectCategory = 'Residential' | 'Commercial' | 'Interior' | 'Landscape'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  imageUrl: string
  description: string
  content: string
}

export const projects: Project[] = [
  {
    id: 'bosphorus-villa',
    title: 'Bosphorus Villa',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    description:
      'A contemporary villa on the European shore of the Bosphorus, balancing panoramic water views with privacy and material warmth.',
    content: `<h2>Site and Setting</h2>
<p>Perched on a steeply sloping plot in Bebek, the Bosphorus Villa was designed to <strong>maximise uninterrupted views of the strait</strong> while maintaining an intimate scale. The site's topography became the architecture's primary organising principle: three cascading platforms descend from the street level, each housing a distinct programme — living, sleeping, and landscape.</p>

<h2>Material Strategy</h2>
<p>The palette draws from the vernacular of Ottoman waterfront mansions — <em>timber, stone, and plaster</em> — reinterpreted in contemporary proportions. Load-bearing limestone walls at the base give way to thermally treated oak screens on the upper levels, filtering sea light into the interior without sacrificing solar control.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" alt="Contemporary villa terrace overlooking water at dusk" />
  <figcaption>The lower terrace at dusk — the boundary between the living room and the Bosphorus is marked only by sliding glass.</figcaption>
</figure>

<h2>Living with the Water</h2>
<p>Every inhabited room is oriented toward the Bosphorus. The primary living space opens fully to a cantilevered terrace over the water through a 9-metre span of structural glass. In summer, the terrace and interior merge into a single room. In winter, the double-layered glazing maintains warmth while the grey strait provides a contemplative backdrop.</p>

<p>The project was completed in 2024 and received a commendation from the Adana Architecture Foundation for its sensitive insertion into a protected coastal landscape.</p>`,
  },
  {
    id: 'atakoy-residence',
    title: 'Ataköy Residence',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
    description:
      'A family residence in Ataköy rethinking the suburban block typology through generous courtyards and cross-ventilated living spaces.',
    content: `<h2>Remaking the Suburban Block</h2>
<p>The Ataköy Residence began with a simple question: how do you build a private family home on a dense urban plot without sacrificing light, air, or connection to the outside? The answer was a <strong>courtyard typology</strong> — four wings organised around a central planted garden that becomes the heart of family life.</p>

<h2>Programme and Circulation</h2>
<p>The ground floor is entirely public — kitchen, dining, and living spaces open toward the courtyard through retractable walls. The upper floor holds three bedrooms, each with its own small private terrace overlooking the garden below. <em>Circulation is treated as architecture</em>: the covered walkway linking the sleeping wing to the living areas is lined with local stone and planted with climbing jasmine.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" alt="Modern family home courtyard with planted garden" />
  <figcaption>The central courtyard in late spring — the jasmine in full bloom against pale limestone walls.</figcaption>
</figure>

<h2>Energy and Comfort</h2>
<p>The building's massing is shaped by a passive environmental strategy: <strong>deep roof overhangs</strong> on the south and west facades shade the living spaces in summer, while the courtyard creates a stack-effect that draws cool air through the house from north to south. No mechanical cooling is required below 35°C.</p>`,
  },
  {
    id: 'levent-tower',
    title: 'Levent Tower',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    description:
      "A mixed-use commercial tower in Levent's financial district, combining office floors, retail podium, and sky terraces.",
    content: `<h2>Urban Presence</h2>
<p>Levent Tower occupies one of the last significant development sites in Adana's primary financial district. The brief required a building that could function as <strong>corporate headquarters for an international law firm</strong> while contributing positively to the street life of Büyükdere Avenue. The result is a 28-storey tower with a generous retail podium that steps back from the pavement to create a new public forecourt.</p>

<h2>Facade and Identity</h2>
<p>The tower's double-skin facade is its defining feature. An outer layer of vertical aluminium fins provides solar control and gives the building a <em>finely scaled, mineral texture</em> that reads well at both street level and from across the Golden Horn. The inner layer is fully glazed, flooding the office floors with diffuse northern light.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80" alt="Glass commercial tower reflecting sky in urban setting" />
  <figcaption>The tower's aluminium fin facade at midday — the fins rotate 15° to optimise shading across all facades.</figcaption>
</figure>

<h2>Sky Terraces and Wellbeing</h2>
<p>Every sixth floor incorporates a full-floor sky terrace: a planted outdoor room accessible to all occupants of the floors above and below. These terraces are not merely amenity — they are <strong>structural air gaps</strong> that break the building's thermal mass, reduce wind loads, and provide emergency refuge. They have become the most valued spaces in the building, consistently cited by occupants as the feature that distinguishes the Tower from its neighbours.</p>`,
  },
  {
    id: 'grand-bazaar-boutique',
    title: 'Grand Bazaar Boutique',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
    description:
      'A small luxury retail concept set within the historic Grand Bazaar, weaving contemporary materiality into a 15th-century urban fabric.',
    content: `<h2>Working Within History</h2>
<p>The Grand Bazaar Boutique presented one of the most demanding briefs of my career: to create a luxury retail environment inside a 15th-century vaulted arcade, without touching the historic fabric. <strong>All new elements float free of the existing walls.</strong> The floor, ceiling, and display system are entirely independent — the ancient masonry vault above is treated as a found ceiling that requires no modification and no apology.</p>

<h2>Materials in Dialogue</h2>
<p>The interior uses three materials: <em>unpolished Afyon marble</em> for the floor, black-patinated steel for the display armatures, and oiled walnut for the small service counter at the rear. Each was chosen for its ability to recede — to allow the centuries-old vaulted ceiling to dominate the spatial experience while still communicating contemporary quality at the product level.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="Luxury boutique interior with stone walls and elegant display fixtures" />
  <figcaption>The display armatures — black-patinated steel, freestanding and entirely reversible — against the original Ottoman masonry.</figcaption>
</figure>

<h2>Light as Material</h2>
<p>Lighting was the critical design decision. Uplights concealed within the marble floor wash the vaulted ceiling in warm light, dramatising the geometry of the ribbed vault. <strong>No light fitting is visible from any position in the shop.</strong> The product displays are lit from within the steel armatures by hairline LED strips, creating the impression that the objects themselves are the light source.</p>`,
  },
  {
    id: 'nisantasi-loft',
    title: 'Nişantaşı Loft',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    description:
      'A 180 m² loft apartment in Nişantaşı reimagined as a sequence of calm, material-rich spaces for a young professional couple.',
    content: `<h2>Finding Space Within Space</h2>
<p>The Nişantaşı Loft began as a standard two-bedroom apartment in a 1970s residential block — competent but undistinguished, with a cellular layout that fragmented the available floor area into disconnected rooms. The intervention was radical but precise: <strong>all interior partitions were removed</strong>, and the programme was reorganised as a single, flowing loft defined by carefully positioned furniture, changes in floor level, and material transitions rather than walls.</p>

<h2>Material Narrative</h2>
<p>Three materials structure the entire apartment. <em>Honed Calacatta marble</em> covers all floor surfaces — its slight variation in tone creates warmth without pattern. White-oiled oak forms the kitchen cabinetry, bathroom vanities, and the main storage wall that spans the full width of the sleeping zone. Exposed concrete, cast in site-made formwork, forms the kitchen island, bathroom surfaces, and the three-step raised platform that defines the sleeping area.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" alt="Open-plan loft interior with marble floors and oak cabinetry" />
  <figcaption>The kitchen — poured concrete island, white-oiled oak cabinetry, hand-pressed zellige tile backsplash. Each material with its own tempo.</figcaption>
</figure>

<h2>The Window as Room</h2>
<p>The apartment's existing windows were retained but reframed — deep stone sills were introduced on the south-facing elevation, wide enough to sit in, creating a <strong>series of window seats</strong> that capture low winter sun and transform a previously inefficient facade condition into the most coveted spaces in the apartment. In a city as dense as Adana, the relationship to the outside world is always the most precious thing a home can offer.</p>`,
  },
  {
    id: 'kalamis-penthouse',
    title: 'Kalamış Penthouse',
    category: 'Interior',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    description:
      'A full-floor penthouse redesign above Kalamış Marina, emphasising views, materiality and a restrained palette of natural stone and steel.',
    content: `<h2>Starting at the Ceiling</h2>
<p>The Kalamış Penthouse occupies the top floor of a 2010s residential tower overlooking the marina. The existing interior was a catalogue of fashionable but incompatible finishes — pale marble competing with dark oak, both competing with the extraordinary view. The first design decision was the most important: <strong>remove everything and let the view do the work.</strong></p>

<h2>A Monochrome Interior</h2>
<p>The revised palette is deliberately quiet: <em>raw white plaster</em> on all walls and ceilings, large-format pale limestone on the floors, and steel — both brushed and blackened — for all joinery and fittings. The absence of warm wood tones prevents the interior from competing visually with the marina's water and the distant silhouette of the Princes' Islands, which becomes the apartment's dominant colour element throughout the day.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80" alt="Penthouse interior with floor-to-ceiling windows overlooking marina" />
  <figcaption>The main living space at sunrise — the interior recedes entirely, allowing the marina and islands to fill the room with colour.</figcaption>
</figure>

<h2>The Roof Terrace</h2>
<p>Access to the roof terrace was redesigned as a spatial sequence rather than a functional threshold. A pivot door of <strong>patinated corten steel</strong> opens onto a planted anteroom — a low-ceilinged decompression chamber lined with fig trees in white concrete planters — before the terrace opens fully to the sky. The compression-then-release creates a moment of genuine architectural drama in what might otherwise be a mundane transition.</p>`,
  },
  {
    id: 'belgrade-forest-garden',
    title: 'Belgrade Forest Garden',
    category: 'Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80',
    description:
      'A private garden and forest retreat at the edge of the Belgrade Forest, designed around biophilic principles and seasonal movement of light.',
    content: `<h2>Between Forest and Garden</h2>
<p>The Belgrade Forest Garden occupies a 4,200 m² site on the southern edge of the forest reserve — a liminal condition between managed garden and ancient woodland. Rather than imposing a formal order onto this rich transitional landscape, the design <strong>works with its existing ecological logic</strong>: a mosaic of cleared glades, dense canopy edges, and planted meadow grassland that shifts dramatically with the seasons.</p>

<h2>The Pavilion</h2>
<p>A single timber pavilion anchors the garden: a 12-metre by 6-metre structure of thermally treated oak and structural glass that opens on three sides to the forest. <em>The pavilion is as much landscape as architecture</em> — a planted roof of sedums and native grasses allows it to be read from above as part of the woodland floor, while from inside it frames views of the forest canopy like a series of living paintings.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Timber pavilion in forest garden with planted green roof" />
  <figcaption>The pavilion in early autumn — the planted roof blends into the surrounding forest floor; the walls of glass dissolve the boundary between inside and outside.</figcaption>
</figure>

<h2>Planting Design</h2>
<p>The planting design is organised in three zones: a <strong>wild-meadow buffer</strong> at the forest edge, a mown grass glade at the garden's centre, and a planted courtyard of clipped hornbeam and gravel immediately adjacent to the house. The meadow buffer requires no irrigation and no mowing, reducing maintenance to a single annual cut in late winter. The result is a garden that participates honestly in the ecology of the forest rather than simply borrowing its scenery.</p>`,
  },
  {
    id: 'princes-islands-retreat',
    title: "Prince's Islands Retreat",
    category: 'Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    description:
      'A landscape redesign of a historic summer retreat on Büyükada, integrating sustainable drainage, native planting, and a central reflective pool.',
    content: `<h2>Island Ecology</h2>
<p>Büyükada — the largest of the Princes' Islands — is a fragile ecosystem. Its water table is shallow, its soils thin, and its historic landscape of pine and fig has been stressed by generations of intensive summer use. The brief for the Prince's Islands Retreat was to <strong>restore ecological function</strong> while creating a landscape that served as the outdoor living room of a large summer family gathering.</p>

<h2>Zero-Infrastructure Drainage</h2>
<p>The central innovation of the project was the redesign of the site's entire drainage logic. The existing site shed all rainfall into a single concrete drain that discharged directly to the sea — wasting the island's most precious resource. In the revised design, <em>all rainfall is managed on site</em>: rain gardens at the base of the slope collect runoff from the roof terraces and allow it to percolate slowly through planted gravel beds into the aquifer below.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=800&q=80" alt="Reflective pool surrounded by native plantings in a Mediterranean garden" />
  <figcaption>The central reflective pool — barely 30 cm deep, yet the emotional anchor of the entire site. In calm weather it perfectly mirrors the pine canopy above.</figcaption>
</figure>

<h2>The Reflective Pool</h2>
<p>At the heart of the garden, a 12-metre by 4-metre reflective pool serves multiple functions. It is a <strong>storage vessel</strong> for harvested rainwater, a <strong>microclimate regulator</strong> that cools the surrounding terraces through evaporation, and a visual anchor that gives the disparate garden elements a common point of reference. Planted with native Phragmites australis and surrounded by stone seating, it is invariably the place where the family comes to rest at the end of a long summer day.</p>`,
  },
]
