export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  content: string
  imageUrl: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'biophilic-design-principles',
    title: 'Biophilic Design: Bringing Nature Into Architecture',
    excerpt:
      'Exploring how integrating natural elements into built spaces improves wellbeing, productivity, and connection to the environment.',
    publishedAt: '2026-01-15T09:00:00Z',
    imageUrl:
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&q=80',
    content: `<h2>Our Evolutionary Inheritance</h2>
<p>Biophilic design is more than a trend — it is a return to our evolutionary roots. Humans have spent the <strong>vast majority of their history</strong> in natural environments, and our buildings are only beginning to acknowledge this debt.</p>

<p>The core principle is simple: when people are surrounded by natural light, living plants, natural materials, and views of the outdoors, they feel better. Studies consistently show:</p>
<ul>
  <li>Reduced cortisol levels and lower perceived stress</li>
  <li>Improved cognitive function and concentration</li>
  <li>Faster recovery times in healthcare settings</li>
  <li>Higher productivity in workplace environments</li>
</ul>

<h2>Practical Strategies</h2>
<p>In practice this means <em>orienting buildings to maximise daylight</em>, selecting timber and stone over synthetic surfaces, weaving courtyards and planted terraces into the programme, and ensuring every inhabited room has a direct sightline to the outside world.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Interior courtyard with climbing plants and natural light" />
  <figcaption>A courtyard at the Belgrade Forest Garden project — the boundary between inside and outside is deliberately blurred.</figcaption>
</figure>

<h2>Belgrade Forest Garden: A Case Study</h2>
<p>My approach in the Belgrade Forest Garden project was to <strong>dissolve the boundary between interior and exterior</strong>. Sliding walls of thermally treated oak fold back entirely in summer. A planted roof insulates and cools while extending the garden vertically. Every bathroom looks onto a private planted courtyard.</p>

<p>The result is a home that <em>breathes with the seasons</em> — cool and shaded in summer, flooded with low winter sun, always anchored to the landscape surrounding it.</p>`,
  },
  {
    slug: 'adaptive-reuse-adana',
    title: "Adaptive Reuse: Giving New Life to Adana's Historic Structures",
    excerpt:
      "How careful adaptive reuse of historic industrial buildings preserves cultural memory while meeting contemporary needs.",
    publishedAt: '2026-02-03T10:30:00Z',
    imageUrl:
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80',
    content: `<h2>Adana as Palimpsest</h2>
<p>Adana is a palimpsest — <strong>layer upon layer of civilisations</strong>, each leaving its mark on the urban fabric. Adaptive reuse architecture honours this complexity by finding new purpose for structures that might otherwise be erased.</p>

<p>The case for retention is both cultural and environmental:</p>
<ul>
  <li><strong>Cultural memory</strong> — historic structures carry collective identity that cannot be rebuilt</li>
  <li><strong>Embodied carbon</strong> — demolition destroys the energy already invested in every brick and beam</li>
  <li><strong>Urban grain</strong> — older buildings create scale and texture that new construction rarely replicates</li>
</ul>

<h2>The Constraints Become the Design</h2>
<p>Working within existing masonry walls demands a different kind of creativity. <em>The constraints become the design.</em> Thick Ottoman walls that once insulated against Bosphorus winds now create intimate reading alcoves. Cast-iron factory columns that supported looms now frame double-height living spaces flooded with light.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80" alt="Restored industrial interior with exposed brick and steel columns" />
  <figcaption>Exposed cast-iron columns retained from the original factory structure, now framing a double-height living space.</figcaption>
</figure>

<h2>The Practice of Listening</h2>
<p>Every adaptive reuse project I undertake begins with an <strong>extended period of listening</strong>: to the building's history, its material logic, and the community that has always surrounded it. An old structure will tell you, if you are patient, exactly what it wants to become.</p>`,
  },
  {
    slug: 'materiality-in-residential-architecture',
    title: 'The Language of Materials in Residential Architecture',
    excerpt:
      'Why the choice of material is never merely aesthetic — and how honest material use defines the character of a home.',
    publishedAt: '2026-02-20T08:00:00Z',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    content: `<h2>Every Surface Communicates</h2>
<p>A material is never neutral. <strong>Travertine</strong> carries the weight of geological time. <em>Rough-sawn oak</em> holds the memory of the forest. <strong>Exposed concrete</strong> speaks of industriousness and permanence. Every surface in a home communicates something to the people who inhabit it, whether they are conscious of it or not.</p>

<h2>Material Honesty</h2>
<p>The most enduring residential architecture I admire shares a quality of <strong>material honesty</strong>: each element is used in accordance with its inherent properties.</p>
<ul>
  <li><strong>Stone</strong> — heavy, compressive, and tactile; works best at ground level in walls and floors that carry weight and invite touch</li>
  <li><strong>Timber</strong> — warm, structural, and forgiving; belongs in roofs, ceilings, and furniture</li>
  <li><strong>Glass</strong> — transparent and reflective; used to frame views, not merely to close openings</li>
  <li><strong>Plaster</strong> — plastic and workable; the skin of a building, suited to curved and irregular forms</li>
</ul>

<figure>
  <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80" alt="Kitchen with concrete island, white oak cabinetry and zellige tile backsplash" />
  <figcaption>The Nişantaşı Loft kitchen: poured concrete island, white-oiled oak cabinetry, hand-made zellige tile — each material with its own logic.</figcaption>
</figure>

<h2>Restraint as Discipline</h2>
<p>Mixing materials creates rhythm and hierarchy. In the <em>Nişantaşı Loft</em>, the kitchen island is poured concrete, the cabinetry is white-oiled oak, and the backsplash is hand-made zellige tile. Each material has its own logic; together they form a coherent and unhurried whole.</p>

<p>The danger in contemporary architecture is <strong>over-complexity</strong> — surfaces competing for attention. Restraint is always harder than elaboration, and almost always more rewarding.</p>`,
  },
  {
    slug: 'compact-urban-living',
    title: 'Compact Living: Designing for Density Without Sacrifice',
    excerpt:
      'As cities grow denser, architects must rethink what "enough space" means and discover how well-designed compact homes can feel generous.',
    publishedAt: '2026-03-05T11:00:00Z',
    imageUrl:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
    content: `<h2>The Shrinking Footprint</h2>
<p>The average Adana apartment is shrinking. Land is scarce, construction costs are rising, and young households are <strong>downsizing their expectations</strong>. The architect's task is to ensure that a smaller footprint does not mean a diminished quality of life.</p>

<h2>Three Spatial Strategies</h2>
<p>Several spatial strategies make compact living feel generous:</p>

<ol>
  <li>
    <strong>Borrowed light</strong> — rooms that share visual connections with adjacent spaces borrow each other's sense of volume. A hallway that looks through a glass partition into a study feels twice as large as an enclosed corridor.
  </li>
  <li>
    <strong>Vertical layering</strong> — in the Levent Tower apartments, low ceilings in storage and bathroom areas allow double-height voids to appear in the living and sleeping zones, creating spatial drama that transcends the modest floor area.
  </li>
  <li>
    <strong>Outdoor connection</strong> — even a narrow balcony, just deep enough for a single chair, extends the perceived floor area and anchors the inhabitant to the city.
  </li>
</ol>

<figure>
  <img src="https://images.unsplash.com/photo-1600607687644-c7e8e3fc9a9e?w=800&q=80" alt="Compact apartment interior with double-height void and balcony" />
  <figcaption>Levent Tower unit: a double-height living void makes 52 m² feel spacious. The narrow balcony is a psychological anchor to the city beyond.</figcaption>
</figure>

<h2>The Balcony as Necessity</h2>
<p>In a compact flat, outdoor connection is not a luxury — it is a <em>psychological necessity</em>. The minimum viable balcony need only be 80 cm deep, but its impact on perceived wellbeing is disproportionate to its area. <strong>Every square centimetre of outdoor space multiplies interior quality.</strong></p>`,
  },
  {
    slug: 'landscape-architecture-water',
    title: 'Water as Structure: Landscape Architecture and the Hydrological Cycle',
    excerpt:
      'Rethinking how landscape architects can design with water rather than against it — from rain gardens to bioswales and reflective pools.',
    publishedAt: '2026-03-18T09:45:00Z',
    imageUrl:
      'https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=1200&q=80',
    content: `<h2>Water as Problem — and Opportunity</h2>
<p>For most of the twentieth century, urban landscapes treated water as a <strong>problem to be solved</strong>: channelled underground, drained away, and forgotten. The consequences — flooding, urban heat islands, depleted aquifers — are now impossible to ignore.</p>

<p>Landscape architecture is recovering a more ancient wisdom: that <em>water, given space to move and rest</em>, becomes one of the most powerful structuring elements in a designed environment.</p>

<h2>Key Techniques</h2>
<ul>
  <li><strong>Rain gardens</strong> — planted depressions that collect runoff and allow slow percolation into the aquifer</li>
  <li><strong>Bioswales</strong> — linear channels planted with deep-rooted species that filter and slow surface water</li>
  <li><strong>Reflective pools</strong> — shallow water bodies that anchor space emotionally and moderate microclimate</li>
  <li><strong>Green roofs</strong> — retain rainfall at source, reducing peak runoff by up to 80%</li>
</ul>

<figure>
  <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" alt="Reflective pool surrounded by native plantings in a landscape garden" />
  <figcaption>The central reflective pool at Prince's Islands Retreat — barely 30 cm deep, yet the emotional anchor of the entire site.</figcaption>
</figure>

<h2>Prince's Islands Retreat: Zero-Infrastructure Drainage</h2>
<p>In the <em>Prince's Islands Retreat</em> project, we redesigned the site's entire drainage logic. Rain gardens at the base of the slope collect runoff from the roof terraces, allowing it to percolate slowly through planted gravel beds into the aquifer below.</p>

<p>The practical result is a site that <strong>manages its entire rainfall on-site with no engineered drainage infrastructure</strong>. The experiential result is a landscape that feels alive — that visibly participates in the natural cycles of the island it inhabits.</p>`,
  },
  {
    slug: 'anadolu-mimarisinde-ahsap',
    title: 'Anadolu Mimarisinde Ahşabın Dili',
    excerpt:
      'Geleneksel Anadolu yapılarında ahşabın yalnızca bir malzeme değil, bir ifade aracı olduğunu ve bu dilin çağdaş tasarıma nasıl taşınabileceğini keşfediyoruz.',
    publishedAt: '2026-04-02T08:30:00Z',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
    content: `<h2>Ahşabın Sessiz Bilgeliği</h2>
<p>Anadolu'nun dağ köylerinde gezerken dikkatimi çeken şey, ahşabın hiçbir zaman yalnızca işlevsel bir malzeme olarak kullanılmamış olmasıdır. <strong>Ceviz, meşe ve kestane</strong> — her biri kendi karakteriyle seçilmiş, kendi mantığıyla yerleştirilmiş. Ustalar, yüzyıllar boyunca ahşabın nerede büküleceğini, nerede çatlayacağını ve nerede yıllarca sessizce hizmet edeceğini öğrenmişler.</p>

<p>Bu bilgi, mimarinin akademik bir disiplin olmadığı dönemlerde doğrudan ellere, gözlere ve nesiller boyunca aktarılan sözlü geleneğe işlenmiştir. Çağdaş mimaride bu birikimi yeniden devreye sokmak hem bir zorunluluk hem de bir sorumluluktur.</p>

<h2>Geleneksel Teknikler, Çağdaş Yorumlar</h2>
<p>Geleneksel Türk ahşap mimarisinin sunduğu ilkeler günümüzde de geçerliliğini korumaktadır:</p>
<ul>
  <li><strong>Cumba çıkmaları</strong> — üst katların sokağa taştığı bu unsurlar, hem gölge yaratır hem de iç mekânı genişletir</li>
  <li><strong>Kafes pencereler</strong> — mahremiyet ile aydınlığı <em>aynı anda</em> sağlayan nüanslı bir filtre sistemi</li>
  <li><strong>Ahşap strüktür ve kerpiç dolgu</strong> — farklı malzemelerin birbirinin zayıflığını tamamladığı dengeli bir sistem</li>
  <li><strong>Saçak derinlikleri</strong> — yağmuru ve yoğun güneşi kontrol altına alan pasif iklim stratejisi</li>
</ul>

<figure>
  <img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80" alt="Geleneksel ahşap detaylı Anadolu evi cephesi" />
  <figcaption>Safranbolu'da 18. yüzyıldan kalma bir konak cephesi — ahşap ve sıvanın diyalogu, çağdaş tasarım için hâlâ tükenmez bir kaynak.</figcaption>
</figure>

<h2>Bir Tasarım Projesi: Karadeniz Köy Evi</h2>
<p>Geçen yıl tamamladığım Karadeniz Köy Evi projesinde bu ilkeleri yeniden yorumlamaya çalıştım. <em>Yerel meşe</em> ile inşa edilen ana strüktür, geleneksel kiriş sisteminden esinlense de çağdaş statik hesaplamalarla yeniden tasarlandı. Saçaklar, güney cephesinde yaz güneşini tamamen keserken kış aylarında alçak güneşin içeri süzülmesine izin verecek şekilde boyutlandırıldı.</p>

<p>Sonuç; <strong>iklime, toprağa ve geleneğe dürüst</strong> bir yapıdır. Bu dürüstlük, her ne kadar sessiz olsa da, mekânı kullananlar tarafından derinden hissedilmektedir.</p>`,
  },
  {
    slug: 'surdurulebilir-kentsel-donusum',
    title: 'Sürdürülebilir Kentsel Dönüşüm: İstanbul\'un Derinliklerinde Yeni Bir Yaşam',
    excerpt:
      'İstanbul\'un köhnemiş kentsel dokusunu yıkmak yerine dönüştürmek; hem ekolojik hem de sosyal sürdürülebilirlik açısından neden tek gerçekçi yol olduğunu tartışıyoruz.',
    publishedAt: '2026-04-10T10:00:00Z',
    imageUrl:
      'https://images.unsplash.com/photo-1505993597083-3bd19fb75e57?w=1200&q=80',
    content: `<h2>Yıkmak mı, Dönüştürmek mi?</h2>
<p>İstanbul'da kentsel dönüşüm söz konusu olduğunda, tartışma çoğu zaman iki uç arasında sıkışıp kalır: <strong>bütünüyle yıkıp yeniden inşa etmek</strong> ya da hiçbir şeye dokunmamak. Oysa sürdürülebilir bir yaklaşım, bu iki kutbun çok dışında bir yerde durur.</p>

<p>Mevcut yapıları dönüştürmenin avantajları hem çevresel hem de sosyal boyutludur:</p>
<ul>
  <li><strong>Gömülü karbon korunur</strong> — her tuğlada, her kirişte harcanan enerji yıkımla birlikte yok olmaz</li>
  <li><strong>Sosyal doku sürer</strong> — mahalle kimlikleri, nesiller boyu oluşan ilişkiler ve kültürel bellek ayakta kalır</li>
  <li><strong>İnşaat atığı azalır</strong> — Türkiye'de yıkım atıklarının kentsel katı atıklar içindeki payı %30'u aşmaktadır</li>
  <li><strong>İklim direnci artar</strong> — eski yapıların kalın duvarları ve yüksek tavanları pasif iklim kontrolü sağlar</li>
</ul>

<h2>Hasköy Atölye Dönüşümü</h2>
<p>Hasköy'de tamamladığımız atölye dönüşüm projesinde, 1930'lardan kalma bir metal işleme atölyesini karma kullanımlı bir yaşam ve çalışma mekânına çevirdik. <em>Özgün çelik çatı makasları</em> temizlenerek korundu; beton döşeme yüzeyi pürüzleri giderilip cilalı hale getirildi. Yeni katmanlara — mutfak, banyo, depolama — özgün strüktürden renk ve doku alarak özgün dile yanıt veren malzemeler seçildi.</p>

<figure>
  <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80" alt="Endüstriyel dönüşüm projesi içi, çelik çatı makasları ve beton döşeme" />
  <figcaption>Hasköy Atölyesi'nde özgün çelik makaslar korunarak yeni yaşam katmanlarına zemin oluşturuldu.</figcaption>
</figure>

<h2>Politika ve Pratik Arasındaki Uçurum</h2>
<p>En büyük engel teknik değil, bürokratiktir. Mevcut ruhsat sistemleri çoğu zaman yeniden inşaatı dönüşüme tercih eder; <strong>imar katsayıları</strong>, mevcut yapıyı korumak yerine yıkıp daha büyük bir bina dikmeyi ekonomik açıdan daha cazip kılar. Mimarlık mesleğinin bu alandaki en acil görevi, tasarım yapmaktan çok savunuculuk yapmaktır: dönüştürmeyi cazip kılan politika değişiklikleri için baskı uygulamak.</p>

<p>Tasarım araçlarımız hazır. Şimdi ihtiyacımız olan <em>siyasi irade</em>dir.</p>`,
  },
  {
    slug: 'pasif-ev-tasarimi-sicak-iklim',
    title: 'Sıcak İklimde Pasif Ev Tasarımı: Serinliği Yakalamak',
    excerpt:
      'Akdeniz ve Ege iklimlerinde, mekanik soğutmaya bağımlılığı en aza indiren pasif tasarım stratejileri ile hem konforlu hem de enerji verimli yaşam mekânları nasıl oluşturulur?',
    publishedAt: '2026-04-18T09:00:00Z',
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    content: `<h2>Güneşi Yönetmek</h2>
<p>Türkiye'nin Ege ve Akdeniz kıyılarında bir ev tasarlamak, her şeyden önce güneşle akılcı bir ilişki kurmak demektir. <strong>Yaz aylarında güneş ışınımı</strong>, iç sıcaklıkları rahatsız edici düzeylere taşırken kış aylarında aynı güneş, ücretsiz bir ısıtma kaynağına dönüşür. İyi bir pasif tasarım, bu iki mevsim arasındaki dengeyi geometriyle kurar.</p>

<p>Temel strateji, güney cephesini <em>kışın açık, yazın kapalı</em> tutmaktır. Bu denge, saçak açısı ve derinliği hesaplanarak elde edilir: 35. enlem civarında yaklaşık 60–65 cm'lik bir saçak derinliği, yaz güneşini tamamen kesiyor; kış güneşini ise tam içeri alıyor.</p>

<h2>Doğal Havalandırma Stratejileri</h2>
<p>Pasif soğutmanın ikinci büyük bileşeni hava hareketidir. Geleneksel Ege mimarisinin küçük pencereleri ve kalın duvarları bu prensiplerle inşa edilmiştir. Çağdaş pasif tasarımda kullanılan başlıca stratejiler şunlardır:</p>
<ul>
  <li><strong>Baca etkisi havalandırması</strong> — altta giren serin havanın ısınarak yükselmesi ve üstten çıkması</li>
  <li><strong>Çapraz havalandırma</strong> — rüzgâr yönü dikkate alınarak karşılıklı açılan pencereler</li>
  <li><strong>Toprağa gömülü borular</strong> — yerin sabit sıcaklığından (yaklaşık 18°C) yararlanarak giren havayı serinleten sistemler</li>
  <li><strong>Gece havalandırması</strong> — termal kütlenin gece serinliğiyle şarj edilmesi, gündüz boyunca yavaş bırakılması</li>
</ul>

<figure>
  <img src="https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?w=800&q=80" alt="Geniş saçaklı beyaz sıvalı Ege evi terası, deniz manzarası" />
  <figcaption>Bodrum Ege Evi'nde 65 cm saçak derinliği, yazın klimaya gerek kalmadan iç sıcaklığı 26°C'nin altında tutuyor.</figcaption>
</figure>

<h2>Bodrum Ege Evi: Rakamlar Konuşuyor</h2>
<p>Bodrum'da tamamladığımız Ege Evi projesinde bu stratejilerin tamamını uyguladık. İlk tam yaz sezonunun ardından <strong>enerji tüketimi, benzer büyüklükteki klimalı bir konutun yüzde kırkının altında</strong> kaldı. Bunu sağlayan tek bir büyük yatırım yoktu — asıl etki, birbiriyle uyumlu küçük kararların birikmesinden geliyordu: doğru yönelim, hesaplanmış saçaklar, termal kütleli taş duvarlar ve hâkim rüzgâra açılan pencereler.</p>

<p>Pasif tasarım, konfor ile sürdürülebilirlik arasında seçim yapmayı gerektirmez. <em>İkisini aynı anda</em> sunar.</p>`,
  },
]
