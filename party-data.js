/**
 * CoreOpinion Party Data
 * ======================
 * Encyclopedic profiles of the major political parties covered by the
 * CoreOpinion tests, grouped by country. Each entry powers an individual
 * profile page at /party/{slug} and a country hub at /parties/{country}.
 *
 * Content is written in a neutral, reference style. Facts are current as of
 * July 2026. Every entry links out to Wikipedia and primary sources so
 * readers can verify and go deeper.
 */

const PARTY_DATA = {

  // ===================================================================
  //  UNITED STATES
  // ===================================================================

  "democratic-party": {
    slug: "democratic-party",
    country: "us",
    countryName: "United States",
    name: "Democratic Party",
    shortName: "Democrats",
    color: "#0B56A4",
    position: "Centre-left",
    founded: "1828",
    leader: "No single leader",
    leaderRole: "Ken Martin chairs the Democratic National Committee (elected 2025)",
    headquarters: "Washington, D.C.",
    e: -0.35,
    g: 0.05,
    ideologyTags: ["Social liberalism", "Modern liberalism", "Progressivism", "Mixed economy"],
    title: "The Democratic Party: History, Ideology, and Policies",
    metaDesc: "A clear guide to the US Democratic Party: its history since 1828, its centre-left ideology, where it stands on the economy, social issues, and foreign policy, and its recent electoral record.",
    keywords: "democratic party, what do democrats believe, democratic party ideology, democratic party policies, us democrats explained, democratic party history, liberal party usa",
    summary: "The older of the two major American parties and the traditional home of the centre-left, favouring an active federal government, a broad social safety net, and expanded civil rights.",
    intro: "The Democratic Party is one of the two major contemporary political parties in the United States, alongside the Republican Party. Founded in 1828, it is the oldest active political party in the world. Over its history it has shifted considerably, but since the mid-twentieth century it has stood on the centre-left of American politics, associated with a more active role for the federal government in the economy and a broadly liberal position on social questions.\n\nThe party has no single national leader in the way parliamentary parties do. Its most visible figures are usually its president or its most recent presidential nominee, along with congressional leaders and state governors. Its national organisation, the Democratic National Committee, is chaired by Ken Martin, who was elected in early 2025.",
    history: "The party traces its origins to the followers of Andrew Jackson in the 1820s, making it a direct descendant of the Jeffersonian tradition. For much of the nineteenth century it was the party of limited federal power and, in the South, of slavery and later segregation. That identity changed over the twentieth century.\n\nThe presidency of Franklin D. Roosevelt in the 1930s reshaped the party around the New Deal, a programme of public works, financial regulation, and social insurance that included Social Security. In the 1960s, under Lyndon B. Johnson, the party embraced the civil rights movement and the Great Society, a decision that gradually moved conservative white Southern voters toward the Republicans. Since then the Democratic coalition has drawn heavily on urban voters, ethnic minorities, younger voters, and college graduates.",
    economic: "Democrats generally support a mixed economy in which markets operate within a framework of regulation and public provision. The party favours progressive taxation, meaning higher rates on higher incomes, and uses federal spending to fund social programmes. It has championed the expansion of health coverage, most notably through the Affordable Care Act of 2010, and supports collective bargaining rights for workers. In recent years the party has placed growing emphasis on climate policy, backing public investment in clean energy.",
    social: "On social issues the party is broadly liberal. It supports legal access to abortion, protections for LGBT people including same-sex marriage, and expanded voting access. It generally favours a path to legal status for undocumented immigrants alongside border enforcement. The party contains a spectrum of views, from moderates who emphasise pragmatism to a progressive wing associated with figures such as Bernie Sanders and Alexandria Ocasio-Cortez that pushes for more ambitious redistribution and structural reform.",
    foreign: "The Democratic Party has generally supported an internationalist foreign policy built around alliances such as NATO, multilateral institutions, and free trade agreements, though scepticism of trade deals has grown in parts of the party. It tends to favour diplomacy and international cooperation on issues like climate change while maintaining a strong military.",
    electoral: "The party held the presidency under Barack Obama from 2009 to 2017 and under Joe Biden from 2021 to 2025. Its 2024 presidential nominee, Kamala Harris, lost to Donald Trump, returning the party to opposition at the federal level. The party remains highly competitive nationally, controlling numerous state governments and forming roughly half of Congress.",
    positions: [
      "Supports a mixed economy with progressive taxation and a broad social safety net",
      "Backs expanding access to healthcare, building on the Affordable Care Act",
      "Treats climate change as a priority, favouring public investment in clean energy",
      "Supports abortion rights and legal protections for LGBT people",
      "Favours a path to legal status for undocumented immigrants alongside border enforcement",
      "Generally internationalist, supporting alliances and multilateral cooperation"
    ],
    figures: [
      { name: "Franklin D. Roosevelt", role: "President, 1933 to 1945", desc: "Architect of the New Deal, which redefined the party around an active federal government and social insurance. His four election victories built a coalition that dominated American politics for a generation." },
      { name: "Barack Obama", role: "President, 2009 to 2017", desc: "The first Black president of the United States. His signature domestic achievement was the Affordable Care Act, the largest expansion of health coverage since the 1960s." },
      { name: "Kamala Harris", role: "Vice President, 2021 to 2025", desc: "Served as vice president under Joe Biden and was the party's presidential nominee in 2024, the first woman of Black and South Asian descent to lead a major party ticket." }
    ],
    sources: [
      { label: "Democratic Party (Wikipedia)", url: "https://en.wikipedia.org/wiki/Democratic_Party_(United_States)" },
      { label: "Official party website", url: "https://democrats.org/" },
      { label: "Democratic Party (Ballotpedia)", url: "https://ballotpedia.org/Democratic_Party" }
    ]
  },

  "republican-party": {
    slug: "republican-party",
    country: "us",
    countryName: "United States",
    name: "Republican Party",
    shortName: "Republicans",
    color: "#D9232F",
    position: "Centre-right to right-wing",
    founded: "1854",
    leader: "Donald Trump",
    leaderRole: "47th President of the United States and the party's dominant figure",
    headquarters: "Washington, D.C.",
    e: 0.55,
    g: 0.35,
    ideologyTags: ["Conservatism", "Right-wing populism", "Economic liberalism", "Nationalism"],
    title: "The Republican Party: History, Ideology, and Policies",
    metaDesc: "A clear guide to the US Republican Party, the GOP: its history since 1854, its conservative ideology, where it stands on the economy, social issues, and foreign policy, and its recent electoral record.",
    keywords: "republican party, what do republicans believe, republican party ideology, gop explained, republican party policies, conservative party usa, maga movement",
    summary: "One of the two major American parties, known as the GOP, standing on the centre-right and reshaped since 2016 by the populist and nationalist movement around Donald Trump.",
    intro: "The Republican Party, often called the GOP or Grand Old Party, is one of the two major political parties in the United States. Founded in 1854 as an anti-slavery coalition, it has for most of the past century stood on the centre-right, associated with lower taxes, a smaller federal role in the economy, and social conservatism.\n\nSince 2016 the party has been reshaped by Donald Trump, whose brand of populism and nationalism has become dominant. Trump won the presidency in 2016, lost in 2020, and returned to office as the 47th president after the 2024 election. He is the party's most influential figure, and much of its current direction reflects his priorities.",
    history: "The party was founded in the 1850s by opponents of the expansion of slavery, and its first president was Abraham Lincoln, who led the country through the Civil War. For decades afterward it was the party of business, industry, and the North.\n\nThrough the twentieth century the party developed the modern conservative coalition, joining economic liberals who favoured free markets with social conservatives and, during the Cold War, foreign policy hawks. Ronald Reagan's presidency in the 1980s crystallised this fusion around tax cuts, deregulation, and a firm stance against the Soviet Union. The party's centre of gravity shifted again after 2016 toward a more populist and nationalist politics focused on immigration, trade, and cultural questions.",
    economic: "Republicans generally favour lower taxes, reduced regulation, and a smaller federal government in domestic economic affairs. The party has traditionally supported free markets and free trade, though under Trump it has moved toward economic nationalism, including tariffs intended to protect domestic industry and pressure trading partners. It typically opposes large expansions of federal social spending and favours market-based approaches to healthcare.",
    social: "The party is socially conservative. It generally opposes abortion, a position strengthened after the Supreme Court overturned the constitutional right to abortion in 2022, returning the question to the states. It supports gun rights under the Second Amendment, favours stricter immigration enforcement and reduced immigration, and emphasises traditional values in debates over education and culture.",
    foreign: "Republican foreign policy has historically emphasised a strong military and assertive American leadership. The Trump-era party has been more sceptical of open-ended overseas commitments and multilateral agreements, favouring an 'America First' approach that prioritises national interests, tighter borders, and renegotiated trade and alliance terms.",
    electoral: "The party held the presidency under George W. Bush from 2001 to 2009 and under Donald Trump from 2017 to 2021. Trump returned to the White House after winning the 2024 election, and the party has been competitive for control of both chambers of Congress. Its coalition has increasingly drawn on working-class and rural voters across regions.",
    positions: [
      "Favours lower taxes, lighter regulation, and a smaller federal government",
      "Has shifted toward economic nationalism, including protective tariffs",
      "Opposes abortion and supports returning the question to the states",
      "Strongly supports gun rights under the Second Amendment",
      "Favours stricter immigration enforcement and reduced immigration",
      "Pursues an 'America First' foreign policy sceptical of open-ended commitments"
    ],
    figures: [
      { name: "Abraham Lincoln", role: "President, 1861 to 1865", desc: "The first Republican president, who led the Union through the Civil War and issued the Emancipation Proclamation. He remains the party's founding icon." },
      { name: "Ronald Reagan", role: "President, 1981 to 1989", desc: "Fused economic liberalism, social conservatism, and Cold War hawkishness into the modern conservative coalition, cutting taxes and confronting the Soviet Union." },
      { name: "Donald Trump", role: "President, 2017 to 2021 and from 2025", desc: "Reshaped the party around a populist and nationalist politics focused on immigration, trade, and cultural questions. He is the dominant figure in the contemporary GOP." }
    ],
    sources: [
      { label: "Republican Party (Wikipedia)", url: "https://en.wikipedia.org/wiki/Republican_Party_(United_States)" },
      { label: "Official party website", url: "https://gop.com/" },
      { label: "Republican Party (Ballotpedia)", url: "https://ballotpedia.org/Republican_Party" }
    ]
  },

  "libertarian-party-us": {
    slug: "libertarian-party-us",
    country: "us",
    countryName: "United States",
    name: "Libertarian Party",
    shortName: "Libertarians",
    color: "#B8860B",
    position: "Libertarian",
    founded: "1971",
    leader: "Evan McMahon",
    leaderRole: "Chair of the Libertarian National Committee (elected 2026)",
    headquarters: "Washington, D.C.",
    e: 0.55,
    g: -0.75,
    ideologyTags: ["Libertarianism", "Classical liberalism", "Non-interventionism", "Fiscal conservatism"],
    title: "The Libertarian Party: History, Ideology, and Policies",
    metaDesc: "A clear guide to the US Libertarian Party: its history since 1971, its philosophy of individual liberty and minimal government, and where it stands on the economy, personal freedom, and foreign policy.",
    keywords: "libertarian party, what do libertarians believe, libertarian party ideology, libertarian party policies, us libertarians explained, third party usa",
    summary: "The largest of the American third parties, arguing for maximum individual liberty, a sharply limited government, free markets, and non-intervention abroad.",
    intro: "The Libertarian Party is the largest third party in the United States by membership and ballot access. Founded in 1971, it advocates a consistent philosophy of individual liberty across both economic and personal questions, arguing that government should be limited to protecting people from force and fraud.\n\nThis places the party in a distinctive position. On economics it aligns with the right in favouring free markets and low taxes, while on social and personal questions it aligns with the left in opposing government restriction of individual choice. The party rarely wins federal office, but it influences debate and can affect close races.",
    history: "The party was founded in Colorado in 1971 by activists who felt neither major party consistently defended individual freedom. It grew steadily through the following decades, running presidential candidates in every election since 1972 and building ballot access across most states.\n\nIts strongest presidential result came in 2016, when former New Mexico governor Gary Johnson won about 3.3 percent of the national vote. The party has periodically debated its own direction, between a pragmatic wing focused on winning elections and a more radical wing focused on ideological purity. Evan McMahon was elected chair of the national committee in 2026.",
    economic: "The Libertarian Party favours free markets with minimal government intervention. It supports sharply lower taxes and spending, opposes most business regulation, and is sceptical of government programmes it views as inefficient or coercive. Many libertarians favour sound money and oppose large public debt. The party generally argues that voluntary exchange and private enterprise, rather than state direction, produce prosperity.",
    social: "On personal freedom the party is strongly liberal. It supports drug decriminalisation, opposes government restrictions on personal lifestyle choices, defends free speech and gun rights, and is generally supportive of abortion rights and same-sex marriage on the principle that these are private matters. The unifying idea is that individuals should be free to live as they choose provided they do not harm others.",
    foreign: "The party is non-interventionist. It opposes most foreign military engagements, favours reducing overseas commitments, and is sceptical of a large defence establishment. It generally supports free trade and open exchange between nations while opposing what it sees as costly and counterproductive military adventures.",
    electoral: "The Libertarian Party has never won a presidential election or a seat in Congress, but it maintains broad ballot access and regularly fields candidates at every level. Its best presidential showing was in 2016. Its main influence is on the framing of debates about the size of government and civil liberties.",
    positions: [
      "Argues for a sharply limited government confined to protecting against force and fraud",
      "Supports free markets, low taxes, and minimal regulation",
      "Opposes most government restriction of personal choices, including drug prohibition",
      "Defends free speech, gun rights, and privacy",
      "Favours non-intervention abroad and reduced overseas military commitments",
      "Supports free trade between nations"
    ],
    figures: [
      { name: "David Nolan", role: "Co-founder, 1943 to 2010", desc: "A founder of the party in 1971 and creator of the Nolan Chart, a two-axis model of politics that separates economic and personal freedom, influencing how many people picture the political spectrum." },
      { name: "Ron Paul", role: "Congressman and standard-bearer", desc: "Ran for president as the party's nominee in 1988 and later as a Republican, popularising libertarian ideas about sound money, civil liberties, and non-intervention to a wide audience." },
      { name: "Gary Johnson", role: "Presidential nominee, 2012 and 2016", desc: "Former Republican governor of New Mexico whose 2016 campaign produced the party's best presidential result, winning about 3.3 percent of the national vote." }
    ],
    sources: [
      { label: "Libertarian Party (Wikipedia)", url: "https://en.wikipedia.org/wiki/Libertarian_Party_(United_States)" },
      { label: "Official party website", url: "https://www.lp.org/" },
      { label: "Libertarian Party (Ballotpedia)", url: "https://ballotpedia.org/Libertarian_Party" }
    ]
  },

  "green-party-us": {
    slug: "green-party-us",
    country: "us",
    countryName: "United States",
    name: "Green Party",
    shortName: "Greens",
    color: "#019246",
    position: "Left-wing",
    founded: "2001",
    leader: "No single leader",
    leaderRole: "Governed by a national committee; Jill Stein was its 2024 presidential nominee",
    headquarters: "Washington, D.C.",
    e: -0.7,
    g: -0.25,
    ideologyTags: ["Green politics", "Eco-socialism", "Grassroots democracy", "Social justice"],
    title: "The Green Party of the United States: History, Ideology, and Policies",
    metaDesc: "A clear guide to the US Green Party: its history, its platform built on ecology and social justice, and where it stands on the economy, the environment, and democratic reform.",
    keywords: "green party usa, what do greens believe, green party ideology, green party policies, green party united states, eco socialism usa",
    summary: "A left-wing party built around environmentalism and social justice, organised on principles of grassroots democracy and independence from corporate money.",
    intro: "The Green Party of the United States is a left-wing party organised around environmentalism, social justice, and grassroots democracy. It was established in its current national form in 2001, growing out of earlier state-level green organisations founded in the 1980s and 1990s.\n\nThe party positions itself to the left of the Democrats and stresses its independence from corporate donations. It draws on a set of core values shared by green parties worldwide, including ecological sustainability, non-violence, decentralisation, and social equality.",
    history: "American green politics developed at the state level during the 1980s, inspired by green movements in Europe. The Association of State Green Parties formed in 1996 and helped run Ralph Nader's high-profile presidential campaign in 2000, which drew close scrutiny because of the closeness of that election. The Green Party of the United States was founded as the national body in 2001.\n\nSince then the party has run presidential candidates, most recently Jill Stein in 2012, 2016, and 2024. It has won a number of local offices across the country but has not achieved federal representation. Its emphasis has remained on building from the local level upward.",
    economic: "The party supports what it calls an eco-social economy, combining environmental sustainability with strong social provision. It backs a Green New Deal to shift the economy toward renewable energy, supports universal healthcare, favours higher taxes on wealth and corporations, and is critical of what it sees as excessive corporate power. It generally prioritises public and cooperative ownership in key sectors over unregulated markets.",
    social: "On social questions the party is firmly progressive. It supports expansive civil rights, racial and gender justice, LGBT equality, abortion rights, and reform of the criminal justice system. It emphasises participatory and grassroots democracy, favouring measures that it argues would reduce the influence of money in politics and increase direct citizen involvement.",
    foreign: "The Green Party favours a non-interventionist and demilitarised foreign policy. It calls for large cuts to military spending, opposes most overseas military engagements, and emphasises diplomacy, international cooperation on climate, and human rights. It is often critical of both major parties on questions of war and defence spending.",
    electoral: "The party has never won federal office but has elected officials to local positions such as city councils and school boards. Its presidential campaigns, particularly in 2000 and 2016, have at times attracted national attention out of proportion to their vote share because of their potential effect on close races.",
    positions: [
      "Places ecology and climate action at the centre of its platform, backing a Green New Deal",
      "Supports universal healthcare and stronger social provision",
      "Favours higher taxes on wealth and corporations",
      "Champions racial, gender, and LGBT equality and criminal justice reform",
      "Emphasises grassroots democracy and reducing the role of money in politics",
      "Calls for large cuts to military spending and a non-interventionist foreign policy"
    ],
    figures: [
      { name: "Ralph Nader", role: "Presidential candidate, 2000", desc: "A veteran consumer advocate whose 2000 Green presidential campaign brought the party national attention and remains its most debated moment because of that election's closeness." },
      { name: "Jill Stein", role: "Presidential nominee, 2012, 2016, and 2024", desc: "A physician and activist who became the party's most frequent presidential standard-bearer, campaigning on a Green New Deal, healthcare, and demilitarisation." }
    ],
    sources: [
      { label: "Green Party of the United States (Wikipedia)", url: "https://en.wikipedia.org/wiki/Green_Party_of_the_United_States" },
      { label: "Official party website", url: "https://www.gp.org/" },
      { label: "Green Party (Ballotpedia)", url: "https://ballotpedia.org/Green_Party_(United_States)" }
    ]
  },

  // ===================================================================
  //  UNITED KINGDOM
  // ===================================================================

  "labour-party": {
    slug: "labour-party",
    country: "uk",
    countryName: "United Kingdom",
    name: "Labour Party",
    shortName: "Labour",
    color: "#E4003B",
    position: "Centre-left",
    founded: "1900",
    leader: "Keir Starmer",
    leaderRole: "Prime Minister of the United Kingdom since 2024",
    headquarters: "London",
    e: -0.4,
    g: 0.1,
    ideologyTags: ["Social democracy", "Democratic socialism", "Labourism"],
    title: "The Labour Party: History, Ideology, and Policies",
    metaDesc: "A clear guide to the UK Labour Party: its history since 1900, its centre-left ideology, where it stands on the economy, public services, and social issues, and its position in government under Keir Starmer.",
    keywords: "labour party, what does labour believe, labour party ideology, labour party policies, keir starmer, uk labour explained, social democracy uk",
    summary: "Britain's main centre-left party and the party of government since 2024, rooted in the trade union movement and committed to public services and workers' rights.",
    intro: "The Labour Party is one of the two largest political parties in the United Kingdom and has been the party of government since July 2024, when it won a large majority under Keir Starmer, who became prime minister. It stands on the centre-left of British politics.\n\nLabour grew out of the trade union movement and socialist societies at the turn of the twentieth century, and it retains formal links with the unions. Its traditions span social democracy, which seeks to reform capitalism through public provision and regulation, and democratic socialism, which seeks deeper structural change. The balance between these traditions has shifted many times.",
    history: "The party was founded in 1900 as the Labour Representation Committee, taking the name Labour Party in 1906. It first formed a government in 1924 and overtook the Liberals as the main alternative to the Conservatives. Its most transformative period came after 1945, when Clement Attlee's government built the National Health Service and much of the modern welfare state and nationalised major industries.\n\nIn the 1990s Tony Blair rebranded the party as New Labour, moving it toward the political centre and winning three consecutive elections from 1997. After a period in opposition and a leftward turn under Jeremy Corbyn, Keir Starmer moved the party back toward the centre and led it to a landslide victory in 2024.",
    economic: "Labour supports a mixed economy in which government plays an active role. In office it has emphasised economic growth, investment in infrastructure and clean energy, and stronger workers' rights, while presenting itself as fiscally responsible. The party favours public ownership or tighter regulation in some sectors, funds public services through taxation, and places particular importance on the National Health Service, which it created and continues to defend.",
    social: "On social questions Labour is broadly liberal and draws strong support in cities and among younger and university-educated voters. It supports equality legislation, LGBT rights, and workers' protections. The party contains a range of views on issues such as immigration and law and order, with its leadership under Starmer generally taking a more centrist and managerial approach than the party's left wing.",
    foreign: "Labour supports NATO and the transatlantic alliance and, in government, has sought a closer working relationship with the European Union without rejoining it. It generally favours international cooperation, development aid, and a rules-based international order, while maintaining the United Kingdom's nuclear deterrent, a question that has at times divided the party.",
    electoral: "Labour has formed several governments since 1945, most notably under Attlee, Wilson, Blair, and now Starmer. Its 2024 general election victory gave it a large Commons majority. In the devolved nations its position varies, and it faces competition from the SNP in Scotland, from Plaid Cymru and Reform UK in Wales, and increasingly from the Greens and Reform UK across England.",
    positions: [
      "Supports a mixed economy with an active role for government in growth and investment",
      "Defends and funds the National Health Service through taxation",
      "Backs stronger workers' rights and employment protections",
      "Broadly liberal on social and equality questions",
      "Supports NATO and a closer working relationship with the European Union",
      "Maintains the United Kingdom's nuclear deterrent"
    ],
    figures: [
      { name: "Clement Attlee", role: "Prime Minister, 1945 to 1951", desc: "Led the postwar government that founded the National Health Service and built the modern welfare state, the most far-reaching domestic programme in the party's history." },
      { name: "Tony Blair", role: "Prime Minister, 1997 to 2007", desc: "Rebranded the party as New Labour and moved it to the centre, winning three consecutive general elections, a record for the party." },
      { name: "Keir Starmer", role: "Prime Minister since 2024", desc: "A former director of public prosecutions who moved the party back toward the centre after 2020 and led it to a landslide victory in the 2024 general election." }
    ],
    sources: [
      { label: "Labour Party (Wikipedia)", url: "https://en.wikipedia.org/wiki/Labour_Party_(UK)" },
      { label: "Official party website", url: "https://labour.org.uk/" },
      { label: "Electoral Commission registration", url: "https://search.electoralcommission.org.uk/" }
    ]
  },

  "conservative-party": {
    slug: "conservative-party",
    country: "uk",
    countryName: "United Kingdom",
    name: "Conservative Party",
    shortName: "Conservatives",
    color: "#003087",
    position: "Centre-right",
    founded: "1834",
    leader: "Kemi Badenoch",
    leaderRole: "Leader of the Opposition since 2024",
    headquarters: "London",
    e: 0.45,
    g: 0.3,
    ideologyTags: ["Conservatism", "Economic liberalism", "British unionism"],
    title: "The Conservative Party: History, Ideology, and Policies",
    metaDesc: "A clear guide to the UK Conservative Party, the Tories: its history, its centre-right ideology, where it stands on the economy and social issues, and its position in opposition under Kemi Badenoch.",
    keywords: "conservative party, what do conservatives believe, tory party ideology, conservative party policies, kemi badenoch, uk conservatives explained, tories",
    summary: "Britain's main centre-right party, known as the Tories, historically the country's most successful electoral force and now in opposition after 2024.",
    intro: "The Conservative Party, widely known as the Tories, is one of the two largest political parties in the United Kingdom and has historically been the most electorally successful party in the democratic world. It stands on the centre-right of British politics. After fourteen years in government, it lost the 2024 general election heavily and is now the official opposition, led by Kemi Badenoch, the first Black leader of a major British party.\n\nConservatism in Britain is less a fixed doctrine than a disposition, favouring gradual change over radical reform, respect for established institutions, free enterprise, and a strong nation state. Over time the party has combined economic liberalism with social and national conservatism in varying measures.",
    history: "The party's roots lie in the Tory tradition of the eighteenth century, with the modern party usually dated to Robert Peel's Tamworth Manifesto of 1834. It dominated much of the nineteenth and twentieth centuries, producing prime ministers from Disraeli to Churchill.\n\nUnder Margaret Thatcher from 1979 the party embraced a programme of privatisation, deregulation, lower taxes, and a reduced role for the state, reshaping the British economy and the wider political consensus. It returned to power in 2010 and governed until 2024, a period that included the Brexit referendum of 2016 and Britain's departure from the European Union. Its heavy defeat in 2024, with losses to both Labour and Reform UK, prompted a search for direction under new leadership.",
    economic: "The party generally favours free markets, lower taxes, and a smaller state, presenting itself as the party of business and fiscal discipline. It supports private enterprise and is cautious about high public spending and borrowing. In practice, Conservative governments have varied between more purely free-market approaches and more interventionist ones, but the broad instinct is toward market solutions and restraint in public spending.",
    social: "On social and cultural questions the party is generally conservative, though it spans a range from liberal to traditionalist. Recent leaderships have emphasised stricter immigration control, law and order, and scepticism toward what they describe as progressive cultural trends. The party is strongly unionist, supporting the continued union of England, Scotland, Wales, and Northern Ireland.",
    foreign: "The Conservatives support NATO, a strong defence, and the nuclear deterrent. Since Brexit the party has emphasised an independent British foreign and trade policy outside the European Union. It generally favours close ties with the United States and other allies while resisting deeper political integration with Europe.",
    electoral: "The party governed from 2010 to 2024 under a succession of prime ministers including David Cameron, Theresa May, Boris Johnson, Liz Truss, and Rishi Sunak. Its 2024 defeat was one of the worst in its history, reducing it to a much smaller group of MPs and putting it into competition with Reform UK for voters on the right.",
    positions: [
      "Favours free markets, lower taxes, and a smaller state",
      "Presents itself as the party of business and fiscal discipline",
      "Emphasises stricter immigration control and law and order",
      "Strongly supports the union of the United Kingdom",
      "Backs NATO, a strong defence, and the nuclear deterrent",
      "Supports an independent British trade and foreign policy after Brexit"
    ],
    figures: [
      { name: "Benjamin Disraeli", role: "Prime Minister, 1868 and 1874 to 1880", desc: "A defining nineteenth-century Conservative who broadened the party's appeal and linked it with one-nation ideas of social reform and national pride." },
      { name: "Margaret Thatcher", role: "Prime Minister, 1979 to 1990", desc: "Reshaped the British economy through privatisation, deregulation, and lower taxes, and moved the wider political consensus toward the free market." },
      { name: "Kemi Badenoch", role: "Leader of the Opposition since 2024", desc: "Won the leadership after the 2024 defeat, becoming the first Black leader of a major British party, and has sought to redefine the party's direction in opposition." }
    ],
    sources: [
      { label: "Conservative Party (Wikipedia)", url: "https://en.wikipedia.org/wiki/Conservative_Party_(UK)" },
      { label: "Official party website", url: "https://www.conservatives.com/" },
      { label: "Electoral Commission registration", url: "https://search.electoralcommission.org.uk/" }
    ]
  },

  "liberal-democrats": {
    slug: "liberal-democrats",
    country: "uk",
    countryName: "United Kingdom",
    name: "Liberal Democrats",
    shortName: "Lib Dems",
    color: "#FAA61A",
    position: "Centre",
    founded: "1988",
    leader: "Ed Davey",
    leaderRole: "Leader of the Liberal Democrats since 2020",
    headquarters: "London",
    e: -0.05,
    g: -0.35,
    ideologyTags: ["Liberalism", "Social liberalism", "Pro-Europeanism"],
    title: "The Liberal Democrats: History, Ideology, and Policies",
    metaDesc: "A clear guide to the UK Liberal Democrats: their history, their liberal and centrist ideology, where they stand on the economy, civil liberties, and Europe, and their recent electoral record under Ed Davey.",
    keywords: "liberal democrats, what do lib dems believe, liberal democrats ideology, lib dem policies, ed davey, uk liberal democrats explained, centrist party uk",
    summary: "Britain's main centrist party, socially liberal and strongly pro-European, and the third largest party in the House of Commons after a record result in 2024.",
    intro: "The Liberal Democrats are a centrist and socially liberal party in the United Kingdom, and after the 2024 general election they are the third largest party in the House of Commons, with their best result in the party's history. They emphasise civil liberties, constitutional reform, environmental protection, and a close relationship with Europe.\n\nThe party sits between Labour and the Conservatives on the traditional left-right axis but tends to be more consistently liberal than either on questions of individual freedom and the constitution. It has strong local roots and a tradition of community campaigning.",
    history: "The party was formed in 1988 by the merger of the Liberal Party, whose history stretches back to the nineteenth century, and the Social Democratic Party, a breakaway from Labour founded in 1981. For years it was the third force in British politics, campaigning for electoral reform and civil liberties.\n\nBetween 2010 and 2015 the party governed in coalition with the Conservatives under Nick Clegg, a period that brought it into power but cost it heavily at the following election. It rebuilt gradually and, campaigning strongly against Brexit and for public services, achieved a breakthrough in 2024, winning 72 seats.",
    economic: "The Liberal Democrats support a regulated market economy with an active but not dominant state. They favour investment in public services, particularly health and social care and education, and tend to support environmental taxation and green investment. The party generally presents itself as fiscally moderate, seeking a balance between market efficiency and social provision.",
    social: "The party is strongly socially liberal. It champions civil liberties, privacy, and human rights, supports LGBT equality and abortion rights, and favours constitutional reform including a change to proportional representation. It is generally welcoming on immigration and emphasises international cooperation and environmental protection.",
    foreign: "The Liberal Democrats are the most consistently pro-European of the major British parties and support the closest possible relationship with the European Union, including eventual membership in the view of many members. They back NATO and international cooperation and place strong emphasis on human rights and development in foreign policy.",
    electoral: "The party governed in coalition from 2010 to 2015 and then spent several years as a smaller force before its record 2024 result of 72 seats made it a substantial presence in the Commons. It performs strongly in parts of southern England and in areas where it has deep local organisation.",
    positions: [
      "Supports a regulated market economy with investment in public services",
      "Places strong emphasis on health and social care",
      "Champions civil liberties, privacy, and human rights",
      "Supports changing to proportional representation",
      "Is the most consistently pro-European major British party",
      "Prioritises environmental protection and green investment"
    ],
    figures: [
      { name: "Paddy Ashdown", role: "Leader, 1988 to 1999", desc: "The party's first leader, who rebuilt it after the difficult merger of 1988 and established it as a serious third force in British politics." },
      { name: "Nick Clegg", role: "Leader, 2007 to 2015", desc: "Led the party into coalition government with the Conservatives from 2010 to 2015 as deputy prime minister, a period of power that later proved electorally costly." },
      { name: "Ed Davey", role: "Leader since 2020", desc: "Led the party to its best ever result in the 2024 general election, winning 72 seats through a focused campaign on public services and local issues." }
    ],
    sources: [
      { label: "Liberal Democrats (Wikipedia)", url: "https://en.wikipedia.org/wiki/Liberal_Democrats_(UK)" },
      { label: "Official party website", url: "https://www.libdems.org.uk/" },
      { label: "Electoral Commission registration", url: "https://search.electoralcommission.org.uk/" }
    ]
  },

  "reform-uk": {
    slug: "reform-uk",
    country: "uk",
    countryName: "United Kingdom",
    name: "Reform UK",
    shortName: "Reform",
    color: "#12B6CF",
    position: "Right-wing populist",
    founded: "2018",
    leader: "Nigel Farage",
    leaderRole: "Leader of Reform UK since 2024",
    headquarters: "London",
    e: 0.4,
    g: 0.55,
    ideologyTags: ["Right-wing populism", "National conservatism", "British sovereigntism"],
    title: "Reform UK: History, Ideology, and Policies",
    metaDesc: "A clear guide to Reform UK: its origins as the Brexit Party, its right-wing populist ideology, where it stands on immigration, the economy, and sovereignty, and its rise under Nigel Farage.",
    keywords: "reform uk, what does reform uk believe, reform uk ideology, reform uk policies, nigel farage, brexit party, reform uk explained",
    summary: "A right-wing populist party led by Nigel Farage, focused on sharply reduced immigration, national sovereignty, and opposition to the established parties.",
    intro: "Reform UK is a right-wing populist party in the United Kingdom led by Nigel Farage. It grew out of the Brexit Party and has risen rapidly, drawing support from voters dissatisfied with the established parties, especially on immigration and the cost of living. It presents itself as an insurgent challenger to what it calls a failed political consensus.\n\nThe party's central themes are a sharp reduction in immigration, the restoration of national sovereignty, lower taxes, and opposition to what it describes as an out-of-touch establishment. It has performed strongly in national opinion polling and has drawn defectors from the Conservative Party.",
    history: "The party was founded in 2018 as the Brexit Party, created to press for a clean break from the European Union after the 2016 referendum. It won the most seats for any British party in the 2019 European Parliament election. After Brexit was completed it was renamed Reform UK in 2021 and broadened its platform beyond Europe.\n\nUnder Nigel Farage, who took over as leader in 2024, the party won five seats at that year's general election and a large share of the national vote. Its momentum continued into 2026, when several Conservative MPs defected to it, and its reported membership grew past a quarter of a million, making it a significant force on the right of British politics.",
    economic: "Reform UK favours lower taxes and a smaller state, arguing that high taxation and regulation hold back growth and living standards. It proposes raising income tax thresholds, cutting what it views as wasteful public spending, and reducing the tax burden on workers and businesses. It combines this with economic nationalism, emphasising British industry, energy security, and scepticism toward net zero climate policies on cost grounds.",
    social: "The party is socially conservative and nationalist. Its defining issue is immigration, where it calls for sharp reductions in both legal and illegal migration and a much tougher enforcement regime. It emphasises national identity, traditional institutions, and opposition to what it describes as progressive cultural orthodoxy. It is strongly critical of the established parties, which it argues have ignored voters' concerns.",
    foreign: "Reform UK emphasises national sovereignty and independence from supranational bodies. It opposes closer alignment with the European Union, is critical of large international commitments it views as against British interests, and stresses control of borders. It generally supports NATO and a strong defence while arguing for a foreign policy focused tightly on national interests.",
    electoral: "The party won five seats at the 2024 general election alongside a large share of the vote, and its representation in the Commons grew during the following parliament through defections from the Conservatives. It has led or run near the top of national opinion polls and made significant gains in local and devolved elections, establishing itself as a serious competitor on the right.",
    positions: [
      "Calls for sharp reductions in both legal and illegal immigration",
      "Emphasises national sovereignty and independence from supranational bodies",
      "Favours lower taxes and raising income tax thresholds",
      "Is sceptical of net zero climate policies on cost grounds",
      "Positions itself against the established Westminster parties",
      "Supports NATO and a foreign policy focused on national interests"
    ],
    figures: [
      { name: "Nigel Farage", role: "Leader since 2024", desc: "A veteran campaigner for Britain's exit from the European Union who led the earlier UK Independence Party and the Brexit Party before taking Reform UK into Parliament in 2024." },
      { name: "Richard Tice", role: "Deputy leader and MP", desc: "A businessman who led the party during its Brexit Party and early Reform UK years and became one of its first members of Parliament in 2024." }
    ],
    sources: [
      { label: "Reform UK (Wikipedia)", url: "https://en.wikipedia.org/wiki/Reform_UK" },
      { label: "Official party website", url: "https://www.reformparty.uk/" },
      { label: "Electoral Commission registration", url: "https://search.electoralcommission.org.uk/" }
    ]
  },

  "green-party-ew": {
    slug: "green-party-ew",
    country: "uk",
    countryName: "United Kingdom",
    name: "Green Party of England and Wales",
    shortName: "Greens",
    color: "#02A95B",
    position: "Left-wing",
    founded: "1990",
    leader: "Zack Polanski",
    leaderRole: "Leader of the Green Party of England and Wales since 2025",
    headquarters: "London",
    e: -0.65,
    g: -0.2,
    ideologyTags: ["Green politics", "Eco-socialism", "Progressivism"],
    title: "The Green Party of England and Wales: History, Ideology, and Policies",
    metaDesc: "A clear guide to the Green Party of England and Wales: its history, its left-wing green ideology, where it stands on the environment, the economy, and social justice, and its rise under Zack Polanski.",
    keywords: "green party uk, what do the greens believe, green party ideology, green party policies, zack polanski, green party england wales explained",
    summary: "A left-wing party built on environmentalism and social justice, which has grown rapidly and now emphasises an eco-populist message linking climate and the cost of living.",
    intro: "The Green Party of England and Wales is a left-wing party built around environmentalism and social justice. It has grown quickly in recent years, winning four seats at the 2024 general election and expanding its membership sharply under Zack Polanski, who became leader in 2025 on an eco-populist platform linking climate action to everyday economic concerns.\n\nThe party stands to the left of Labour on many economic questions and places ecological sustainability at the centre of its politics. It also has strong local roots, with hundreds of councillors across England and Wales.",
    history: "British green politics began with the PEOPLE party in 1973, which became the Ecology Party and then, in 1985, the Green Party. In 1990 the party divided along national lines, and the Green Party of England and Wales became a distinct organisation alongside separate Scottish and Northern Ireland green parties.\n\nThe party won its first parliamentary seat in 2010 with Caroline Lucas in Brighton Pavilion. It expanded to four seats in 2024 under the joint leadership of Carla Denyer and Adrian Ramsay. In 2025 Zack Polanski was elected leader, and the party saw a rapid rise in membership and strong results in the 2026 local elections.",
    economic: "The party supports an economy reorganised around environmental sustainability and social equality. It backs a large programme of green investment, higher taxes on wealth and high incomes, expanded public services, and public or cooperative ownership in key sectors such as energy and water. Its eco-populist framing under recent leadership links the climate crisis directly to the cost of living and inequality.",
    social: "The Greens are strongly progressive on social questions. They support expansive civil liberties, racial and gender equality, LGBT rights, and reform of the criminal justice and immigration systems. They favour constitutional reform including proportional representation and emphasise participatory democracy and decentralisation of power.",
    foreign: "The party favours a foreign policy centred on peace, international cooperation, and climate justice. It generally opposes high military spending and overseas military intervention, supports nuclear disarmament, and calls for ambitious international action on climate change and global inequality.",
    electoral: "The party won its first seat in 2010 and expanded to four in 2024. It holds hundreds of local council seats and has become a growing presence, particularly among younger and left-leaning voters. Its 2026 local election results were the best in its history.",
    positions: [
      "Places environmental sustainability and climate action at the centre of policy",
      "Backs large green investment funded by higher taxes on wealth",
      "Supports expanded public services and public ownership of key utilities",
      "Strongly progressive on equality and civil liberties",
      "Favours proportional representation and decentralised democracy",
      "Supports nuclear disarmament and lower military spending"
    ],
    figures: [
      { name: "Caroline Lucas", role: "First Green MP, 2010 to 2024", desc: "Won the party's first seat in Parliament in Brighton Pavilion in 2010 and became its most recognisable national figure over more than a decade as its sole MP." },
      { name: "Zack Polanski", role: "Leader since 2025", desc: "Elected leader in 2025 on an eco-populist platform linking climate action to the cost of living, presiding over a sharp rise in membership and strong local election results." }
    ],
    sources: [
      { label: "Green Party of England and Wales (Wikipedia)", url: "https://en.wikipedia.org/wiki/Green_Party_of_England_and_Wales" },
      { label: "Official party website", url: "https://greenparty.org.uk/" },
      { label: "Electoral Commission registration", url: "https://search.electoralcommission.org.uk/" }
    ]
  },

  "snp": {
    slug: "snp",
    country: "uk",
    countryName: "United Kingdom",
    name: "Scottish National Party",
    shortName: "SNP",
    color: "#B59F00",
    position: "Centre-left",
    founded: "1934",
    leader: "John Swinney",
    leaderRole: "First Minister of Scotland and SNP leader",
    headquarters: "Edinburgh",
    e: -0.4,
    g: -0.05,
    ideologyTags: ["Scottish nationalism", "Social democracy", "Pro-Europeanism"],
    title: "The Scottish National Party: History, Ideology, and Policies",
    metaDesc: "A clear guide to the Scottish National Party (SNP): its history, its case for Scottish independence, its centre-left social democratic ideology, and its position in government at Holyrood under John Swinney.",
    keywords: "snp, scottish national party, what does the snp believe, snp ideology, snp policies, scottish independence, john swinney, snp explained",
    summary: "Scotland's dominant party, combining the campaign for Scottish independence with a centre-left, social democratic and pro-European platform.",
    intro: "The Scottish National Party, usually called the SNP, is the largest political party in Scotland and has led the devolved Scottish Government at Holyrood for most of the period since 2007. Its defining goal is Scottish independence, the establishment of Scotland as a sovereign state separate from the United Kingdom. Alongside this it holds a centre-left, social democratic position on economic and social policy.\n\nThe party contests elections both to the Scottish Parliament and to the House of Commons at Westminster, where it has at times been the third largest party. It combines national self-government with a broadly progressive domestic agenda and a pro-European outlook.",
    history: "The SNP was founded in 1934 through the merger of two earlier nationalist groups. For decades it was a marginal force, but it grew from the 1960s onward and became a serious electoral power with the creation of the devolved Scottish Parliament in 1999.\n\nIt first formed a Scottish government in 2007 and has governed since, under leaders including Alex Salmond and Nicola Sturgeon. Its central moment was the 2014 independence referendum, which the party lost by 55 to 45 percent but which transformed Scottish politics and boosted SNP support. In the 2026 Scottish Parliament election the party won the most seats and John Swinney continued as First Minister at the head of a minority government.",
    economic: "The SNP supports a social democratic economic approach, favouring public services, redistribution, and an active role for government. In office at Holyrood it has emphasised free university tuition, free personal care, and other universal benefits funded through the Scottish budget. It argues that independence would allow Scotland to pursue economic policies better suited to its own circumstances, including on energy and taxation.",
    social: "On social questions the party is broadly progressive. It supports LGBT rights, a welcoming approach to immigration, and equality legislation. It presents Scottish national identity in civic rather than ethnic terms, defining membership of the nation by residence and commitment rather than ancestry. It favours constitutional reform and the deepening of Scottish self-government.",
    foreign: "The SNP is strongly pro-European and supports Scotland rejoining the European Union as an independent state. It opposes the United Kingdom's nuclear weapons, which are based in Scotland, and has campaigned for their removal. It generally favours international cooperation, development, and a foreign policy distinct from that of Westminster.",
    electoral: "The party has governed Scotland since 2007 and dominated Scottish representation at Westminster for much of the past decade. In the 2026 Scottish Parliament election it again won the most seats, 57, remaining the largest party and continuing in government, though without an overall majority.",
    positions: [
      "Campaigns for Scottish independence from the United Kingdom",
      "Holds a centre-left, social democratic position on the economy",
      "Supports universal benefits such as free university tuition in Scotland",
      "Defines Scottish identity in civic rather than ethnic terms",
      "Is strongly pro-European and supports rejoining the European Union",
      "Opposes the United Kingdom's nuclear weapons based in Scotland"
    ],
    figures: [
      { name: "Alex Salmond", role: "First Minister, 2007 to 2014", desc: "Led the SNP to power at Holyrood and secured the 2014 independence referendum, the party's defining political moment, before resigning after the No vote." },
      { name: "Nicola Sturgeon", role: "First Minister, 2014 to 2023", desc: "Led the party through a long period of electoral dominance in Scotland and kept the question of independence at the centre of Scottish politics." },
      { name: "John Swinney", role: "First Minister and party leader", desc: "A long-serving senior figure who became leader and First Minister and led the party to the most seats in the 2026 Scottish Parliament election." }
    ],
    sources: [
      { label: "Scottish National Party (Wikipedia)", url: "https://en.wikipedia.org/wiki/Scottish_National_Party" },
      { label: "Official party website", url: "https://www.snp.org/" },
      { label: "Electoral Commission registration", url: "https://search.electoralcommission.org.uk/" }
    ]
  },

  "restore-britain": {
    slug: "restore-britain",
    country: "uk",
    countryName: "United Kingdom",
    name: "Restore Britain",
    shortName: "Restore Britain",
    color: "#1A3A6B",
    position: "Right-wing",
    founded: "2026",
    leader: "Rupert Lowe",
    leaderRole: "Leader of Restore Britain and Member of Parliament",
    headquarters: "United Kingdom",
    e: 0.5,
    g: 0.6,
    ideologyTags: ["Right-wing populism", "National conservatism", "British sovereigntism"],
    title: "Restore Britain: History, Ideology, and Policies",
    metaDesc: "A clear guide to Restore Britain, the party founded by MP Rupert Lowe: its origins in 2026, its right-wing nationalist positions on immigration and sovereignty, and how it compares with Reform UK.",
    keywords: "restore britain, rupert lowe, restore britain party, restore britain ideology, restore britain policies, new right wing party uk",
    summary: "A newly registered right-wing party founded by MP Rupert Lowe, campaigning on sharply reduced immigration, national sovereignty, and direct democracy.",
    intro: "Restore Britain is a right-wing political party in the United Kingdom founded by Rupert Lowe, a Member of Parliament who was originally elected for Reform UK before leaving to sit as an independent. The party began as a campaign movement in 2025 and was registered as a political party with the Electoral Commission in early 2026, allowing it to field candidates in elections.\n\nIt occupies similar ground to Reform UK on the right of British politics, with a strong emphasis on reducing immigration and restoring what it describes as national sovereignty and accountability. As a very new party it is still building its organisation and testing its electoral support.",
    history: "Restore Britain grew out of the political activity of Rupert Lowe, who was elected as a Reform UK MP at the 2024 general election and later split from that party. He launched Restore Britain first as a pressure group in 2025, and it was formally registered as a political party in March 2026, with Lowe as its leader and nominating officer.\n\nAs a young party its history is still being written. It has attracted a number of local councillors and campaigners and has begun contesting elections, positioning itself as a harder-edged alternative to Reform UK on the right.",
    economic: "Restore Britain favours lower taxes, reduced public spending, and a smaller state, in common with other parties on the British right. It emphasises economic self-reliance, support for domestic industry, and scepticism toward large government programmes and toward net zero climate policies, which it argues impose excessive costs. Its economic programme is still developing as the party establishes itself.",
    social: "The party is nationalist and socially conservative, with immigration as its central issue. It calls for very sharp reductions in immigration and stronger enforcement, and it emphasises national identity, law and order, and traditional institutions. It also stresses political accountability and direct democracy, arguing that established parties have failed to represent voters' concerns.",
    foreign: "Restore Britain emphasises national sovereignty and independence from supranational institutions. It opposes closer alignment with the European Union and stresses control of borders and a foreign policy centred tightly on British national interests. As a new party its detailed foreign policy positions are still emerging.",
    electoral: "Restore Britain is a very new party, registered only in 2026, and its electoral record is limited. It is represented in the House of Commons by its founder Rupert Lowe and has attracted a number of local councillors. Its future strength will depend on whether it can build support alongside the larger Reform UK on the right of British politics.",
    positions: [
      "Calls for very sharp reductions in immigration and stronger enforcement",
      "Emphasises national sovereignty and independence from supranational bodies",
      "Favours lower taxes and a smaller state",
      "Is sceptical of net zero climate policies on cost grounds",
      "Stresses political accountability and direct democracy",
      "Positions itself to the right of the established parties"
    ],
    figures: [
      { name: "Rupert Lowe", role: "Founder and leader", desc: "A businessman and Member of Parliament first elected for Reform UK in 2024, who left to sit as an independent and founded Restore Britain, registering it as a party in 2026." }
    ],
    sources: [
      { label: "Restore Britain (Wikipedia)", url: "https://en.wikipedia.org/wiki/Restore_Britain" },
      { label: "Official party website", url: "https://www.restorebritain.org.uk/" },
      { label: "Electoral Commission registration", url: "https://search.electoralcommission.org.uk/Registrations/PP18382" }
    ]
  },

  // ===================================================================
  //  CANADA
  // ===================================================================

  "liberal-party-canada": {
    slug: "liberal-party-canada",
    country: "ca",
    countryName: "Canada",
    name: "Liberal Party of Canada",
    shortName: "Liberals",
    color: "#D71920",
    position: "Centre to centre-left",
    founded: "1867",
    leader: "Mark Carney",
    leaderRole: "Prime Minister of Canada since 2025",
    headquarters: "Ottawa",
    e: -0.2,
    g: 0.0,
    ideologyTags: ["Liberalism", "Social liberalism", "Centrism"],
    title: "The Liberal Party of Canada: History, Ideology, and Policies",
    metaDesc: "A clear guide to the Liberal Party of Canada: its history, its centrist and socially liberal ideology, where it stands on the economy and social issues, and its record in government under Mark Carney.",
    keywords: "liberal party of canada, what do canadian liberals believe, liberal party canada ideology, mark carney, canada liberals explained",
    summary: "Canada's traditional governing party of the centre, socially liberal and pragmatic, returned to power for a fourth term in 2025 under Mark Carney.",
    intro: "The Liberal Party of Canada is one of the country's two historically dominant parties and has governed Canada for more of its history than any other. It sits in the centre of Canadian politics, combining social liberalism with a pragmatic, managerial approach to the economy. It returned to power for a fourth consecutive term at the 2025 federal election under Mark Carney, who leads a minority government.\n\nThe party has long presented itself as a broad, unifying force able to govern from the centre, balancing market economics with an active federal role in areas such as healthcare, social policy, and national unity.",
    history: "The Liberals emerged in the years around Confederation in 1867 and became a natural governing party through the twentieth century under leaders such as Wilfrid Laurier, William Lyon Mackenzie King, and Pierre Trudeau, who patriated the constitution and introduced the Charter of Rights and Freedoms in 1982.\n\nAfter a period in opposition, the party returned to power in 2015 under Justin Trudeau. When Trudeau stood down in early 2025, Mark Carney, a former governor of both the Bank of Canada and the Bank of England, won the leadership and then led the party to a come-from-behind election victory shaped heavily by trade tensions with the United States.",
    economic: "The Liberals support a market economy with an active federal government. They favour targeted public investment, a national approach to issues such as childcare and healthcare funding, and carbon pricing as part of climate policy, though the details have shifted over time. Under Mark Carney the party has emphasised economic resilience, investment, and managing the relationship with the United States.",
    social: "The party is socially liberal. It supports abortion rights, LGBT equality, a points-based but relatively open immigration system, and official bilingualism. It generally positions itself as a defender of the Charter of Rights and of a pluralistic, multicultural Canada.",
    foreign: "The Liberals support multilateralism, NATO, and close ties with democratic allies, while managing an often difficult relationship with the United States, Canada's largest trading partner. The 2025 election was dominated by that relationship, and the party campaigned on defending Canadian sovereignty and economic interests.",
    electoral: "The Liberals have formed government for much of Canadian history. After winning majorities and minorities under Justin Trudeau from 2015, they won a fourth consecutive term in April 2025 under Mark Carney, taking 169 seats and forming a minority government just short of a majority.",
    positions: [
      "Supports a market economy with an active federal role in social programmes",
      "Backs national frameworks for childcare and healthcare funding",
      "Supports carbon pricing and climate action, with shifting details",
      "Socially liberal on abortion, LGBT rights, and immigration",
      "Defends official bilingualism and multiculturalism",
      "Prioritises managing the relationship with the United States"
    ],
    figures: [
      { name: "Pierre Trudeau", role: "Prime Minister, 1968 to 1979 and 1980 to 1984", desc: "A defining Liberal leader who patriated the constitution and introduced the Charter of Rights and Freedoms, shaping modern Canadian identity." },
      { name: "Justin Trudeau", role: "Prime Minister, 2015 to 2025", desc: "Returned the Liberals to power in 2015 and led three governments before standing down in early 2025." },
      { name: "Mark Carney", role: "Prime Minister since 2025", desc: "A former central banker who won the Liberal leadership in 2025 and led the party to a fourth consecutive election victory amid trade tensions with the United States." }
    ],
    sources: [
      { label: "Liberal Party of Canada (Wikipedia)", url: "https://en.wikipedia.org/wiki/Liberal_Party_of_Canada" },
      { label: "Official party website", url: "https://liberal.ca/" },
      { label: "2025 Canadian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Canadian_federal_election" }
    ]
  },

  "conservative-party-canada": {
    slug: "conservative-party-canada",
    country: "ca",
    countryName: "Canada",
    name: "Conservative Party of Canada",
    shortName: "Conservatives",
    color: "#1A4782",
    position: "Centre-right",
    founded: "2003",
    leader: "Pierre Poilievre",
    leaderRole: "Leader of the Opposition",
    headquarters: "Ottawa",
    e: 0.45,
    g: 0.25,
    ideologyTags: ["Conservatism", "Economic liberalism", "Federalism"],
    title: "The Conservative Party of Canada: History, Ideology, and Policies",
    metaDesc: "A clear guide to the Conservative Party of Canada: its history, its centre-right ideology, where it stands on the economy and social issues, and its role in opposition under Pierre Poilievre.",
    keywords: "conservative party of canada, what do canadian conservatives believe, conservative party canada ideology, pierre poilievre, canada conservatives explained",
    summary: "Canada's main centre-right party, favouring lower taxes, smaller government, and resource development, and the official opposition under Pierre Poilievre.",
    intro: "The Conservative Party of Canada is the country's main centre-right party and the principal alternative to the Liberals. It favours lower taxes, a smaller federal government, free enterprise, and support for the natural resources sector. It is the official opposition, led by Pierre Poilievre.\n\nThe party brings together fiscal conservatives, social conservatives, and populist strands, and it draws particular strength in the Prairie provinces and rural Canada while competing hard in suburban areas.",
    history: "The modern party was formed in 2003 by the merger of the Progressive Conservative Party and the Canadian Alliance, uniting the right after years of division. Under Stephen Harper it governed from 2006 to 2015, first in minority and then in majority.\n\nAfter losing power in 2015, the party went through several leaders before Pierre Poilievre won the leadership in 2022 on a populist, anti-establishment message focused on affordability. The party led in the polls for much of the following period but fell short at the 2025 election, though it made significant gains and remained the official opposition.",
    economic: "The Conservatives favour lower taxes, balanced budgets, and reduced regulation. They support the oil, gas, and mining sectors and pipeline development, and they have strongly opposed the federal carbon tax on affordability grounds. The party emphasises housing supply, cost of living, and cutting what it sees as wasteful federal spending.",
    social: "The party spans a range of social views. Its leadership under Poilievre has focused on economic and affordability themes rather than social issues, while the base includes both socially moderate and socially conservative members. It emphasises law and order and a firm approach to crime.",
    foreign: "The Conservatives support NATO, a strong military, and close ties with the United States and other allies, while emphasising Canadian sovereignty, particularly in the Arctic. They generally favour free trade and a robust defence of national economic interests.",
    electoral: "The party governed under Stephen Harper from 2006 to 2015. After leading in the polls for much of 2023 and 2024, it improved its position at the 2025 election but did not win, remaining the official opposition. Poilievre lost his own seat at that election and later returned to Parliament through a by-election.",
    positions: [
      "Favours lower taxes, balanced budgets, and less regulation",
      "Strongly supports oil, gas, mining, and pipeline development",
      "Opposes the federal carbon tax on affordability grounds",
      "Emphasises housing supply and the cost of living",
      "Stresses law and order and a firm approach to crime",
      "Supports NATO, a strong military, and Arctic sovereignty"
    ],
    figures: [
      { name: "Stephen Harper", role: "Prime Minister, 2006 to 2015", desc: "The first leader of the united Conservative Party to govern, overseeing tax cuts, free trade deals, and a cautious response to the global financial crisis." },
      { name: "Pierre Poilievre", role: "Leader of the Opposition", desc: "Won the leadership in 2022 on a populist, affordability-focused message, leading the party to significant gains at the 2025 election though not to government." }
    ],
    sources: [
      { label: "Conservative Party of Canada (Wikipedia)", url: "https://en.wikipedia.org/wiki/Conservative_Party_of_Canada" },
      { label: "Official party website", url: "https://www.conservative.ca/" },
      { label: "2025 Canadian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Canadian_federal_election" }
    ]
  },

  "new-democratic-party": {
    slug: "new-democratic-party",
    country: "ca",
    countryName: "Canada",
    name: "New Democratic Party",
    shortName: "NDP",
    color: "#F58220",
    position: "Left-wing",
    founded: "1961",
    leader: "Don Davies",
    leaderRole: "Interim leader following the 2025 election",
    headquarters: "Ottawa",
    e: -0.55,
    g: -0.1,
    ideologyTags: ["Social democracy", "Democratic socialism", "Labour movement"],
    title: "The New Democratic Party: History, Ideology, and Policies",
    metaDesc: "A clear guide to Canada's New Democratic Party (NDP): its history, its social democratic ideology, where it stands on the economy and social issues, and its position after the 2025 election.",
    keywords: "new democratic party, ndp canada, what does the ndp believe, ndp ideology, ndp policies, canada ndp explained",
    summary: "Canada's main left-wing party, rooted in the labour and social democratic tradition, campaigning for expanded public services and workers' rights.",
    intro: "The New Democratic Party, usually called the NDP, is Canada's main left-wing party. It grew out of the labour and social democratic movements and campaigns for expanded public services, workers' rights, and a stronger social safety net. It has never formed a national government but has often held influence, particularly in minority parliaments.\n\nThe party has governed several provinces and helped shape national policy, most famously by pressing for the introduction of public healthcare. After the 2025 federal election it lost official party status and was led on an interim basis while it rebuilt.",
    history: "The NDP was founded in 1961 through an alliance of the Co-operative Commonwealth Federation and the Canadian Labour Congress. Its first leader, Tommy Douglas, had earlier introduced public healthcare in Saskatchewan, a model later adopted nationwide.\n\nThe party reached its federal high point in 2011, when it became the official opposition under Jack Layton. Under Jagmeet Singh from 2017 it supported Liberal minority governments through a confidence agreement. At the 2025 election the party lost heavily, falling below the threshold for official party status, and Singh resigned after losing his own seat.",
    economic: "The NDP supports a strong role for government in the economy. It favours higher taxes on the wealthy and large corporations, expanded public services including pharmacare and dental care, stronger labour protections, and public investment in housing and green energy. It is generally critical of corporate concentration and emphasises affordability for working people.",
    social: "The party is firmly progressive. It supports LGBT rights, reconciliation with Indigenous peoples, a welcoming immigration policy, and expanded civil rights. It emphasises social justice, equality, and public provision as central to its identity.",
    foreign: "The NDP favours diplomacy, human rights, and international cooperation, and it has often been more sceptical than other parties of military interventions and large defence commitments. It supports development aid and a foreign policy grounded in multilateral institutions.",
    electoral: "The party became the official opposition for the first time in 2011 and held significant influence during Liberal minority governments after 2019. The 2025 election was a severe setback, costing it official party status and prompting a leadership transition and rebuild.",
    positions: [
      "Supports higher taxes on the wealthy and large corporations",
      "Backs expanded public services such as pharmacare and dental care",
      "Champions stronger labour protections and workers' rights",
      "Emphasises reconciliation with Indigenous peoples",
      "Supports public investment in housing and green energy",
      "Favours diplomacy and is cautious about military commitments"
    ],
    figures: [
      { name: "Tommy Douglas", role: "First NDP leader and father of Medicare", desc: "Introduced public healthcare in Saskatchewan before it became a national programme, and is often named among the most admired figures in Canadian history." },
      { name: "Jack Layton", role: "Leader, 2003 to 2011", desc: "Led the NDP to become the official opposition for the first time in 2011, its best ever federal result, shortly before his death." },
      { name: "Jagmeet Singh", role: "Leader, 2017 to 2025", desc: "Led the party through Liberal minority parliaments and a confidence agreement before resigning after the 2025 election." }
    ],
    sources: [
      { label: "New Democratic Party (Wikipedia)", url: "https://en.wikipedia.org/wiki/New_Democratic_Party" },
      { label: "Official party website", url: "https://www.ndp.ca/" },
      { label: "2025 Canadian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Canadian_federal_election" }
    ]
  },

  "green-party-canada": {
    slug: "green-party-canada",
    country: "ca",
    countryName: "Canada",
    name: "Green Party of Canada",
    shortName: "Greens",
    color: "#3D9B35",
    position: "Left-wing",
    founded: "1983",
    leader: "Elizabeth May",
    leaderRole: "Parliamentary leader of the Green Party of Canada",
    headquarters: "Ottawa",
    e: -0.5,
    g: -0.2,
    ideologyTags: ["Green politics", "Environmentalism", "Social justice"],
    title: "The Green Party of Canada: History, Ideology, and Policies",
    metaDesc: "A clear guide to the Green Party of Canada: its history, its environmental and social justice ideology, where it stands on the economy and climate, and its role in federal politics.",
    keywords: "green party of canada, what do canadian greens believe, green party canada ideology, elizabeth may, canada greens explained",
    summary: "Canada's environmental party, focused on climate action and social justice, holding a small number of seats in Parliament.",
    intro: "The Green Party of Canada is the country's main environmental party. It places climate action and ecological sustainability at the centre of its politics, combined with a broadly left-wing social platform. It has held a small number of federal seats and has its strongest support on the west coast and in parts of Atlantic Canada.\n\nThe party is closely associated with Elizabeth May, who became its first member of Parliament and has led it for much of its recent history, latterly as co-leader.",
    history: "The party was founded in 1983 as part of the wider growth of green movements around the world. For years it contested elections without winning seats, gradually building its vote.\n\nIts breakthrough came in 2011 when Elizabeth May won the British Columbia seat of Saanich-Gulf Islands, becoming the party's first MP. The Greens have since held a handful of seats, with May remaining their central figure through several leadership arrangements.",
    economic: "The Greens support an economy reorganised around environmental sustainability. They back a rapid shift to renewable energy, investment in public transit and green infrastructure, higher taxes on pollution and wealth, and stronger social provision. They are critical of continued expansion of fossil fuel production.",
    social: "The party is progressive on social issues, supporting Indigenous reconciliation, LGBT rights, a welcoming immigration policy, and expanded civil liberties. It emphasises participatory democracy and often gives its MPs freedom to vote according to conscience rather than a strict party line.",
    foreign: "The Greens favour a foreign policy centred on peace, human rights, climate justice, and international cooperation. They generally support lower military spending and emphasise diplomacy and global environmental agreements.",
    electoral: "The party won its first seat in 2011 and has since held a small number of federal seats. Its influence rests less on numbers in Parliament than on keeping environmental issues prominent in national debate.",
    positions: [
      "Places climate action and sustainability at the centre of policy",
      "Backs a rapid shift to renewable energy and green infrastructure",
      "Supports higher taxes on pollution and wealth",
      "Champions Indigenous reconciliation and civil liberties",
      "Emphasises participatory democracy and conscience voting",
      "Favours peace, human rights, and climate justice abroad"
    ],
    figures: [
      { name: "Elizabeth May", role: "Co-leader and long-standing MP", desc: "Became the party's first member of Parliament in 2011 and has been its defining figure, leading it through several arrangements including as co-leader." }
    ],
    sources: [
      { label: "Green Party of Canada (Wikipedia)", url: "https://en.wikipedia.org/wiki/Green_Party_of_Canada" },
      { label: "Official party website", url: "https://www.greenparty.ca/" },
      { label: "2025 Canadian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Canadian_federal_election" }
    ]
  },

  "bloc-quebecois": {
    slug: "bloc-quebecois",
    country: "ca",
    countryName: "Canada",
    name: "Bloc Québécois",
    shortName: "Bloc",
    color: "#0088CE",
    position: "Centre-left, Quebec nationalist",
    founded: "1991",
    leader: "Yves-François Blanchet",
    leaderRole: "Leader of the Bloc Québécois",
    headquarters: "Montreal",
    e: -0.3,
    g: 0.0,
    ideologyTags: ["Quebec nationalism", "Sovereigntism", "Social democracy"],
    title: "The Bloc Québécois: History, Ideology, and Policies",
    metaDesc: "A clear guide to the Bloc Québécois: its history, its mission to defend Quebec's interests and sovereignty, its centre-left social platform, and its role in the Canadian Parliament.",
    keywords: "bloc quebecois, what does the bloc quebecois believe, bloc quebecois ideology, yves-francois blanchet, quebec sovereignty party",
    summary: "A party that runs only in Quebec, defending Quebec's interests and its right to sovereignty, with a broadly centre-left social platform.",
    intro: "The Bloc Québécois is a federal party that runs candidates only in the province of Quebec. Its purpose is to defend Quebec's interests in the Canadian Parliament and to promote Quebec sovereignty, the idea that Quebec should become an independent country. On social and economic questions it is broadly centre-left.\n\nBecause it stands only in Quebec, the Bloc can never form a national government, but it has at times held a large share of Quebec's seats and significant influence in minority parliaments.",
    history: "The party was founded in 1991 by Members of Parliament who left other parties after the failure of constitutional efforts to recognise Quebec as a distinct society. It rose quickly and was briefly the official opposition in the mid-1990s, at the height of the sovereignty movement.\n\nIts fortunes have risen and fallen with support for Quebec independence. Under Yves-François Blanchet, leader since 2019, the party recovered strongly and again became a major force among Quebec's federal seats.",
    economic: "The Bloc supports a social democratic economic approach, favouring public services, environmental protection, and policies it argues serve Quebec's specific interests. It presses Ottawa for greater transfers and autonomy for Quebec and defends the province's distinct social model.",
    social: "The party reflects Quebec's generally progressive social attitudes on questions such as LGBT rights and secularism, while strongly defending the French language and Quebec's cultural distinctiveness. It supports Quebec's own approach to immigration and integration.",
    foreign: "As a party focused on Quebec, the Bloc has a limited foreign policy platform, but it generally favours multilateralism, environmental agreements, and a foreign policy that reflects Quebec's values. Its central external goal remains recognition of Quebec's right to self-determination.",
    electoral: "The Bloc was briefly the official opposition in the 1990s and has since fluctuated with the sovereignty movement. Under Blanchet it rebounded to hold a large bloc of Quebec's federal seats and remains a significant presence in the Commons.",
    positions: [
      "Runs only in Quebec and exists to defend Quebec's interests",
      "Promotes Quebec sovereignty and the right to self-determination",
      "Holds a broadly social democratic economic position",
      "Strongly defends the French language and Quebec culture",
      "Supports Quebec's distinct approach to immigration and secularism",
      "Presses Ottawa for greater autonomy and transfers for Quebec"
    ],
    figures: [
      { name: "Lucien Bouchard", role: "Founding leader", desc: "Led the Bloc to become the official opposition in 1993 at the height of the sovereignty movement, before returning to Quebec provincial politics." },
      { name: "Yves-François Blanchet", role: "Leader since 2019", desc: "Revived the party's fortunes after a period of decline, leading it back to a strong share of Quebec's federal seats." }
    ],
    sources: [
      { label: "Bloc Québécois (Wikipedia)", url: "https://en.wikipedia.org/wiki/Bloc_Qu%C3%A9b%C3%A9cois" },
      { label: "Official party website", url: "https://www.blocquebecois.org/" },
      { label: "2025 Canadian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Canadian_federal_election" }
    ]
  },

  "peoples-party-canada": {
    slug: "peoples-party-canada",
    country: "ca",
    countryName: "Canada",
    name: "People's Party of Canada",
    shortName: "PPC",
    color: "#4B306A",
    position: "Right-wing populist",
    founded: "2018",
    leader: "Maxime Bernier",
    leaderRole: "Founder and leader of the People's Party of Canada",
    headquarters: "Gatineau",
    e: 0.6,
    g: 0.3,
    ideologyTags: ["Right-wing populism", "National conservatism", "Libertarian conservatism"],
    title: "The People's Party of Canada: History, Ideology, and Policies",
    metaDesc: "A clear guide to the People's Party of Canada (PPC): its founding by Maxime Bernier, its right-wing populist ideology, and where it stands on immigration, the economy, and government.",
    keywords: "peoples party of canada, ppc canada, what does the ppc believe, ppc ideology, maxime bernier, canada ppc explained",
    summary: "A right-wing populist party founded by Maxime Bernier, campaigning for sharply reduced immigration, lower taxes, and a smaller state.",
    intro: "The People's Party of Canada, known as the PPC, is a right-wing populist party founded and led by Maxime Bernier. It campaigns for sharply reduced immigration, lower taxes, a smaller federal government, and the rejection of what it describes as political correctness and globalism. It has attracted a notable share of the vote but has not won seats in Parliament.\n\nThe party positions itself to the right of the Conservatives and appeals to voters who feel the main parties have moved too far toward the political centre.",
    history: "The party was founded in 2018 by Maxime Bernier, a former Conservative cabinet minister who narrowly lost that party's 2017 leadership race and then left to form his own movement. It contested its first general election in 2019.\n\nThe PPC gained wider attention during the COVID-19 period, when its opposition to lockdowns and vaccine mandates lifted its vote share to around five percent in 2021, though it still won no seats. It has continued to run nationally on a populist platform.",
    economic: "The PPC favours sharply lower taxes, deep cuts to federal spending, balanced budgets, and a much smaller government. It supports free markets, opposes corporate subsidies and supply management in agriculture, and calls for the removal of interprovincial trade barriers. It is strongly opposed to carbon pricing.",
    social: "The party is nationalist and socially conservative in emphasis, with immigration as its central issue. It calls for large reductions in immigration levels and a tighter approach to the border, and it emphasises Canadian identity and free speech while opposing what it describes as identity politics.",
    foreign: "The PPC emphasises national sovereignty and is sceptical of international institutions and agreements it views as against Canadian interests. It favours a foreign policy focused tightly on national interests and controlled borders.",
    electoral: "The PPC has never won a seat in Parliament. Its best result came in 2021, when it took around five percent of the national vote, boosted by opposition to pandemic restrictions. It continues to contest elections across the country.",
    positions: [
      "Calls for sharp reductions in immigration levels",
      "Favours deep cuts to taxes and federal spending",
      "Opposes carbon pricing and corporate subsidies",
      "Wants to remove interprovincial trade barriers",
      "Emphasises free speech and opposes identity politics",
      "Stresses national sovereignty and controlled borders"
    ],
    figures: [
      { name: "Maxime Bernier", role: "Founder and leader", desc: "A former Conservative cabinet minister who founded the PPC in 2018 after narrowly losing the Conservative leadership, and has led it ever since on a populist platform." }
    ],
    sources: [
      { label: "People's Party of Canada (Wikipedia)", url: "https://en.wikipedia.org/wiki/People%27s_Party_of_Canada" },
      { label: "Official party website", url: "https://www.peoplespartyofcanada.ca/" },
      { label: "2025 Canadian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Canadian_federal_election" }
    ]
  },

  // ===================================================================
  //  AUSTRALIA
  // ===================================================================

  "labor-party-australia": {
    slug: "labor-party-australia",
    country: "au",
    countryName: "Australia",
    name: "Australian Labor Party",
    shortName: "Labor",
    color: "#E13940",
    position: "Centre-left",
    founded: "1901",
    leader: "Anthony Albanese",
    leaderRole: "Prime Minister of Australia since 2022",
    headquarters: "Canberra",
    e: -0.35,
    g: 0.1,
    ideologyTags: ["Social democracy", "Labourism", "Progressivism"],
    title: "The Australian Labor Party: History, Ideology, and Policies",
    metaDesc: "A clear guide to the Australian Labor Party (ALP): its history, its centre-left ideology, where it stands on the economy and social issues, and its record in government under Anthony Albanese.",
    keywords: "australian labor party, alp, what does labor believe, labor party australia ideology, anthony albanese, australia labor explained",
    summary: "Australia's main centre-left party, rooted in the union movement, returned for a large second term in 2025 under Anthony Albanese.",
    intro: "The Australian Labor Party, known as the ALP or simply Labor, is one of Australia's two major parties and the main force on the centre-left. It grew out of the labour and trade union movement and supports an active government role in the economy, a strong social safety net, and workers' rights. It won a large second-term majority at the 2025 federal election under Anthony Albanese.\n\nLabor is one of the oldest political parties in Australia and has alternated in government with the Liberal-National Coalition for more than a century.",
    history: "Labor formed in the 1890s out of the trade union movement and first held federal office in the early years of the Commonwealth after 1901. It built much of Australia's welfare state and, under Gough Whitlam in the 1970s, introduced universal healthcare and expanded higher education.\n\nUnder Bob Hawke and Paul Keating in the 1980s and 1990s the party modernised the economy while keeping a strong social agenda. After a period in opposition, Labor returned to power in 2022 under Anthony Albanese and then won a commanding second-term majority in 2025.",
    economic: "Labor supports a market economy guided by an active government. It favours investment in health, education, and clean energy, stronger workers' rights and wage growth, and a role for government in easing the cost of living. It created and defends Medicare, Australia's universal health system, and supports the superannuation retirement savings scheme.",
    social: "The party is broadly progressive. It supports action on climate change, reconciliation with Indigenous Australians, LGBT equality, and multicultural immigration. It generally takes a more liberal position than the Coalition on social and environmental questions while managing a range of views within its own ranks.",
    foreign: "Labor supports the alliance with the United States, including the AUKUS defence partnership, while seeking stable relations with China and closer engagement with Pacific and Southeast Asian neighbours. It emphasises regional diplomacy alongside a strong defence.",
    electoral: "Labor has formed many federal governments since Federation. It returned to power in 2022 and won a large second-term majority in 2025, one of its strongest results, as the Coalition suffered heavy losses.",
    positions: [
      "Supports a market economy with active government investment",
      "Created and defends Medicare, the universal health system",
      "Backs stronger workers' rights and wage growth",
      "Supports climate action and investment in clean energy",
      "Favours reconciliation with Indigenous Australians",
      "Supports the US alliance and AUKUS while engaging the region"
    ],
    figures: [
      { name: "Gough Whitlam", role: "Prime Minister, 1972 to 1975", desc: "Led a reforming government that introduced universal healthcare, expanded higher education, and modernised Australian social policy." },
      { name: "Bob Hawke", role: "Prime Minister, 1983 to 1991", desc: "Australia's longest-serving Labor prime minister, who modernised the economy while maintaining a strong social agenda and consensus style." },
      { name: "Anthony Albanese", role: "Prime Minister since 2022", desc: "Returned Labor to power in 2022 and led it to a commanding second-term majority in 2025." }
    ],
    sources: [
      { label: "Australian Labor Party (Wikipedia)", url: "https://en.wikipedia.org/wiki/Australian_Labor_Party" },
      { label: "Official party website", url: "https://www.alp.org.au/" },
      { label: "2025 Australian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Australian_federal_election" }
    ]
  },

  "liberal-party-australia": {
    slug: "liberal-party-australia",
    country: "au",
    countryName: "Australia",
    name: "Liberal Party of Australia",
    shortName: "Liberals",
    color: "#0A52A0",
    position: "Centre-right",
    founded: "1944",
    leader: "Sussan Ley",
    leaderRole: "Leader of the Opposition since 2025",
    headquarters: "Canberra",
    e: 0.45,
    g: 0.25,
    ideologyTags: ["Liberal conservatism", "Economic liberalism", "Conservatism"],
    title: "The Liberal Party of Australia: History, Ideology, and Policies",
    metaDesc: "A clear guide to the Liberal Party of Australia: its history, its centre-right ideology, where it stands on the economy and social issues, and its role in opposition under Sussan Ley.",
    keywords: "liberal party of australia, what do australian liberals believe, liberal party australia ideology, sussan ley, australia liberals explained",
    summary: "Australia's main centre-right party, favouring free enterprise and lower taxes, now in opposition under Sussan Ley, the first woman to lead it.",
    intro: "The Liberal Party of Australia is the country's main centre-right party. Despite its name it is a conservative and pro-market party, favouring free enterprise, lower taxes, and individual responsibility. It usually governs in coalition with the smaller National Party. After a heavy defeat in 2025 it is in opposition, led by Sussan Ley, the first woman to lead the party.\n\nThe Liberals and their Coalition partner have alternated in government with Labor throughout Australia's modern history.",
    history: "The party was founded in 1944 by Robert Menzies, who went on to become Australia's longest-serving prime minister. It drew together earlier anti-Labor and liberal groups into a durable centre-right force.\n\nThe party governed for long stretches, including under John Howard from 1996 to 2007 and, most recently, under a Coalition government from 2013 to 2022. After returning to opposition in 2022, it suffered one of its worst defeats in 2025, losing many seats including that of its then leader, and subsequently elected Sussan Ley.",
    economic: "The Liberals favour free markets, lower taxes, and a smaller government. They support private enterprise, budget restraint, and deregulation, and they present themselves as stronger economic managers. They have generally been more cautious than Labor on climate measures, emphasising cost and energy reliability.",
    social: "The party spans liberal and conservative strands on social issues. In recent years it has faced debate about its direction, particularly after losing formerly safe urban seats to socially liberal independents. Its base includes both moderates and social conservatives.",
    foreign: "The Liberals strongly support the alliance with the United States, including AUKUS, and a robust defence posture. They emphasise national security, border control, and close ties with traditional allies while managing the relationship with China.",
    electoral: "The party governed under Menzies, Howard, and most recently in Coalition from 2013 to 2022. Its 2025 defeat was among its worst, reducing it to around forty seats and prompting a period of rebuilding under new leadership.",
    positions: [
      "Favours free markets, lower taxes, and a smaller government",
      "Presents itself as the stronger economic manager",
      "Emphasises energy reliability and cost in climate policy",
      "Stresses national security and border control",
      "Strongly supports the US alliance and AUKUS",
      "Usually governs in coalition with the National Party"
    ],
    figures: [
      { name: "Robert Menzies", role: "Prime Minister, 1939 to 1941 and 1949 to 1966", desc: "Founded the Liberal Party in 1944 and became Australia's longest-serving prime minister, establishing the modern centre-right." },
      { name: "John Howard", role: "Prime Minister, 1996 to 2007", desc: "Australia's second longest-serving prime minister, who cut taxes, introduced a goods and services tax, and took a firm stance on border control." },
      { name: "Sussan Ley", role: "Leader of the Opposition since 2025", desc: "Became the first woman to lead the Liberal Party after its 2025 defeat, tasked with rebuilding it in opposition." }
    ],
    sources: [
      { label: "Liberal Party of Australia (Wikipedia)", url: "https://en.wikipedia.org/wiki/Liberal_Party_of_Australia" },
      { label: "Official party website", url: "https://www.liberal.org.au/" },
      { label: "2025 Australian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Australian_federal_election" }
    ]
  },

  "national-party-australia": {
    slug: "national-party-australia",
    country: "au",
    countryName: "Australia",
    name: "National Party of Australia",
    shortName: "Nationals",
    color: "#0A612B",
    position: "Centre-right, agrarian",
    founded: "1920",
    leader: "David Littleproud",
    leaderRole: "Leader of the National Party",
    headquarters: "Canberra",
    e: 0.4,
    g: 0.3,
    ideologyTags: ["Agrarianism", "Conservatism", "Regionalism"],
    title: "The National Party of Australia: History, Ideology, and Policies",
    metaDesc: "A clear guide to the National Party of Australia: its history representing rural and regional Australia, its centre-right agrarian ideology, and its long-standing coalition with the Liberals.",
    keywords: "national party of australia, the nationals, what do the nationals believe, nationals ideology, david littleproud, australia nationals explained",
    summary: "A centre-right party representing rural and regional Australia, the long-standing coalition partner of the Liberal Party.",
    intro: "The National Party of Australia, usually called the Nationals, is a centre-right party that represents rural and regional Australia. It has been the junior partner in coalition with the Liberal Party for most of the past century, and together they form the main alternative to Labor.\n\nThe party focuses on the interests of farmers, regional communities, and resource industries, and it combines economic conservatism with a strong regional and agrarian identity.",
    history: "The party was founded in 1920 as the Country Party, growing out of farmers' movements seeking a distinct voice in national politics. It quickly established the coalition arrangement with the main non-Labor party that has largely endured ever since.\n\nRenamed the National Party, it has provided several deputy prime ministers and held key portfolios in Coalition governments, particularly those affecting agriculture, resources, and regional development. It has generally maintained its rural base even as Australia has urbanised.",
    economic: "The Nationals support free enterprise and lower taxes but also favour targeted government support for regional Australia, including infrastructure, drought assistance, and services for rural communities. They strongly back agriculture, mining, and resource development, and have often pressed for practical rather than ambitious climate measures on cost grounds.",
    social: "The party is generally socially conservative, reflecting the values of its regional base. It emphasises community, tradition, and the concerns of country Australia, and it often takes more traditional positions than its urban Coalition partner on social questions.",
    foreign: "The Nationals support the US alliance and a strong defence, and they place particular emphasis on trade access for Australian agricultural and resource exports. They favour a foreign and trade policy that protects the interests of regional producers.",
    electoral: "As a smaller party the Nationals do not aim to govern alone, but through the Coalition they have long shared in government and held senior positions. Their support is concentrated in rural and regional seats, which they have generally held even through difficult national elections.",
    positions: [
      "Represents rural and regional Australia",
      "Strongly backs agriculture, mining, and resource industries",
      "Supports targeted government investment in regional infrastructure",
      "Favours practical, cost-focused climate measures",
      "Generally socially conservative in emphasis",
      "Governs in long-standing coalition with the Liberals"
    ],
    figures: [
      { name: "John McEwen", role: "Long-serving leader and briefly Prime Minister in 1967", desc: "A dominant figure who shaped the Country Party's economic protectionism and its central role in Coalition governments." },
      { name: "David Littleproud", role: "Leader of the National Party", desc: "Leads the Nationals as the junior Coalition partner, focusing on regional Australia, agriculture, and resource industries." }
    ],
    sources: [
      { label: "National Party of Australia (Wikipedia)", url: "https://en.wikipedia.org/wiki/National_Party_of_Australia" },
      { label: "Official party website", url: "https://www.nationals.org.au/" },
      { label: "2025 Australian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Australian_federal_election" }
    ]
  },

  "australian-greens": {
    slug: "australian-greens",
    country: "au",
    countryName: "Australia",
    name: "Australian Greens",
    shortName: "Greens",
    color: "#009C3D",
    position: "Left-wing",
    founded: "1992",
    leader: "Larissa Waters",
    leaderRole: "Leader of the Australian Greens since 2025",
    headquarters: "Canberra",
    e: -0.6,
    g: -0.2,
    ideologyTags: ["Green politics", "Eco-socialism", "Progressivism"],
    title: "The Australian Greens: History, Ideology, and Policies",
    metaDesc: "A clear guide to the Australian Greens: their history, their left-wing environmental ideology, where they stand on climate, the economy, and social justice, and their role in the Senate.",
    keywords: "australian greens, what do the greens believe, greens australia ideology, larissa waters, australia greens explained",
    summary: "Australia's main left-wing party, built on environmentalism and social justice, holding significant influence through the Senate.",
    intro: "The Australian Greens are the country's main left-wing party, built around environmentalism, social justice, and grassroots democracy. They stand to the left of Labor on most issues and have their greatest influence in the Senate, where they often hold the balance of power. Larissa Waters became leader in 2025.\n\nThe party draws strong support among younger and urban voters and has become an established part of the Australian political landscape.",
    history: "The Greens formed as a national party in 1992, drawing together earlier state-level environmental parties, with roots in Tasmania's pioneering environmental movement. Under Bob Brown they grew into a significant force, particularly in the Senate.\n\nThe party reached a peak in the House of Representatives at the 2022 election, winning several lower-house seats, before being reduced again in 2025 even as it retained substantial Senate representation and influence.",
    economic: "The Greens support an economy reorganised around sustainability and equality. They back a rapid transition away from fossil fuels, large public investment in renewable energy and housing, higher taxes on corporations and wealth, and expanded public services including dental care in Medicare. They are strongly critical of new coal and gas projects.",
    social: "The party is firmly progressive. It supports treaty and truth-telling processes with Indigenous Australians, LGBT rights, a humane refugee policy, and expanded civil liberties. It emphasises participatory democracy and social equality.",
    foreign: "The Greens favour an independent foreign policy centred on peace, human rights, and climate justice. They have been critical of AUKUS and high defence spending, and they emphasise diplomacy, disarmament, and global climate action.",
    electoral: "The Greens hold significant representation in the Senate, where they frequently hold the balance of power, and have at times won seats in the House of Representatives. Their national vote has grown over the decades to make them a durable third force.",
    positions: [
      "Places climate action at the centre, opposing new coal and gas",
      "Backs large public investment in renewables and housing",
      "Supports higher taxes on corporations and wealth",
      "Wants dental care included in Medicare",
      "Supports treaty processes with Indigenous Australians",
      "Critical of AUKUS and high defence spending"
    ],
    figures: [
      { name: "Bob Brown", role: "Founding parliamentary leader", desc: "A Tasmanian environmental campaigner who led the Greens to national prominence and established them as a lasting force in the Senate." },
      { name: "Larissa Waters", role: "Leader since 2025", desc: "A Queensland senator who became leader of the Greens in 2025, continuing the party's focus on climate action and social justice." }
    ],
    sources: [
      { label: "Australian Greens (Wikipedia)", url: "https://en.wikipedia.org/wiki/Australian_Greens" },
      { label: "Official party website", url: "https://greens.org.au/" },
      { label: "2025 Australian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Australian_federal_election" }
    ]
  },

  "teal-independents": {
    slug: "teal-independents",
    country: "au",
    countryName: "Australia",
    name: "Teal Independents",
    shortName: "Teals",
    color: "#159B9B",
    position: "Centre, socially liberal",
    founded: "2022",
    leader: "No leader (independents)",
    leaderRole: "A movement of unaligned independent MPs, not a formal party",
    headquarters: "None",
    e: 0.0,
    g: -0.2,
    ideologyTags: ["Independent politics", "Climate action", "Political integrity"],
    title: "The Teal Independents: History, Ideology, and What They Stand For",
    metaDesc: "A clear guide to Australia's Teal Independents: who they are, why they emerged in 2022, and what unites this group of climate-focused, socially liberal independent MPs.",
    keywords: "teal independents, what are the teals, teal independents australia, climate 200, australia teals explained, independent mps australia",
    summary: "A loose movement of socially liberal, climate-focused independent MPs, not a formal party, who won former Liberal urban seats from 2022.",
    intro: "The Teal Independents are not a formal political party but a loose movement of independent members of parliament who share a broadly similar outlook. They are socially liberal, strongly focused on climate action and political integrity, and generally fiscally moderate. The name comes from the blue-green colour many of them adopted, blending the blue associated with the Liberals and the green of environmental politics.\n\nThe teals emerged as a significant force in 2022, when several of them won affluent urban seats that had long been safe for the Liberal Party, and they have since become a notable presence in Parliament.",
    history: "The movement grew out of community campaigns in wealthy, traditionally Liberal-voting electorates whose voters wanted stronger action on climate change and higher standards in politics. Many teal candidates were backed by the fundraising group Climate 200, though each ran as an independent.\n\nAt the 2022 federal election a group of teal independents defeated prominent Liberal MPs in seats across Sydney, Melbourne, Perth, and beyond. Because they are independents rather than a party, they do not have a single leader or a binding platform, but they vote together on many issues.",
    economic: "The teals are generally fiscally moderate and pro-market, reflecting the affluent electorates they represent, while supporting a strong economic response to climate change. They tend to favour sensible budget management alongside investment in the transition to clean energy, and they do not share the more redistributive agenda of the left.",
    social: "The teals are socially liberal. They support gender equality, integrity in government including a strong federal anti-corruption body, and progressive positions on many social questions. Their appeal rests heavily on combining economic moderation with social liberalism and climate ambition.",
    foreign: "As independents the teals do not have a common foreign policy, though they generally support Australia's alliances while emphasising climate diplomacy and higher standards of transparency and accountability in government decision-making.",
    electoral: "The teals won a cluster of formerly safe Liberal seats in 2022 and have contested subsequent elections as independents. Their significance lies in reshaping competition in affluent urban electorates and in pressing the major parties on climate and integrity.",
    positions: [
      "Operate as independents, not a formal party with a single leader",
      "Strongly focused on climate action and clean energy",
      "Champion integrity in government and anti-corruption measures",
      "Socially liberal on gender and equality questions",
      "Generally fiscally moderate and pro-market",
      "Draw support in affluent, formerly Liberal urban seats"
    ],
    figures: [
      { name: "Climate 200", role: "Fundraising and support network", desc: "A community funding group that backed many teal candidates, though each stood as an independent rather than as part of a party." }
    ],
    sources: [
      { label: "Teal independents (Wikipedia)", url: "https://en.wikipedia.org/wiki/Teal_independents" },
      { label: "Climate 200 (Wikipedia)", url: "https://en.wikipedia.org/wiki/Climate_200" },
      { label: "2025 Australian federal election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2025_Australian_federal_election" }
    ]
  },

  // ===================================================================
  //  NEW ZEALAND
  // ===================================================================

  "national-party-nz": {
    slug: "national-party-nz",
    country: "nz",
    countryName: "New Zealand",
    name: "New Zealand National Party",
    shortName: "National",
    color: "#00529F",
    position: "Centre-right",
    founded: "1936",
    leader: "Christopher Luxon",
    leaderRole: "Prime Minister of New Zealand since 2023",
    headquarters: "Wellington",
    e: 0.4,
    g: 0.2,
    ideologyTags: ["Liberal conservatism", "Economic liberalism", "Conservatism"],
    title: "The New Zealand National Party: History, Ideology, and Policies",
    metaDesc: "A clear guide to the New Zealand National Party: its history, its centre-right ideology, where it stands on the economy and social issues, and its record in government under Christopher Luxon.",
    keywords: "new zealand national party, what does national believe, national party nz ideology, christopher luxon, nz national explained",
    summary: "New Zealand's main centre-right party, favouring free enterprise and lower taxes, leading the current coalition government under Christopher Luxon.",
    intro: "The New Zealand National Party is one of the country's two largest parties and the main force on the centre-right. It favours free enterprise, lower taxes, and fiscal discipline, combined with a generally pragmatic approach to social policy. It has led the government since late 2023 under Christopher Luxon, in coalition with the ACT and New Zealand First parties.\n\nNational has alternated in power with the Labour Party for decades and draws broad support across provincial and suburban New Zealand.",
    history: "The party was formed in 1936 from the merger of earlier conservative and liberal groups to oppose the first Labour government. It became a natural party of government, holding office for long stretches through the twentieth century.\n\nUnder leaders such as Keith Holyoake, Jim Bolger, and John Key, National governed during major periods of economic reform and stability. After a spell in opposition, it returned to power at the 2023 election under Christopher Luxon, forming a three-party coalition government.",
    economic: "National favours free markets, lower taxes, and restrained public spending. It supports private enterprise and infrastructure investment, and it has emphasised restoring economic growth and easing the cost of living. It is generally more cautious than the left on the size of the state and on new spending.",
    social: "The party is broadly pragmatic on social issues, spanning liberal and conservative members. It emphasises law and order, education standards, and welfare settings that encourage work, while generally accepting established social reforms.",
    foreign: "National supports New Zealand's traditional partnerships, trade liberalisation, and an independent foreign policy including the country's long-standing nuclear-free stance. It places strong emphasis on trade access for New Zealand exports and stable relations across the Asia-Pacific region.",
    electoral: "National has formed many governments since 1936. It returned to power at the 2023 election and leads a coalition with ACT and New Zealand First. The next general election is scheduled for November 2026.",
    positions: [
      "Favours free markets, lower taxes, and restrained spending",
      "Emphasises economic growth and easing the cost of living",
      "Stresses law and order and education standards",
      "Supports welfare settings that encourage work",
      "Backs trade liberalisation and export access",
      "Maintains New Zealand's nuclear-free foreign policy"
    ],
    figures: [
      { name: "John Key", role: "Prime Minister, 2008 to 2016", desc: "A popular National leader who governed through the global financial crisis and the Christchurch earthquakes, emphasising pragmatic centre-right management." },
      { name: "Christopher Luxon", role: "Prime Minister since 2023", desc: "A former airline chief executive who led National back to power in 2023 at the head of a three-party coalition government." }
    ],
    sources: [
      { label: "New Zealand National Party (Wikipedia)", url: "https://en.wikipedia.org/wiki/New_Zealand_National_Party" },
      { label: "Official party website", url: "https://www.national.org.nz/" },
      { label: "Sixth National Government of New Zealand (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sixth_National_Government_of_New_Zealand" }
    ]
  },

  "labour-party-nz": {
    slug: "labour-party-nz",
    country: "nz",
    countryName: "New Zealand",
    name: "New Zealand Labour Party",
    shortName: "Labour",
    color: "#D82A20",
    position: "Centre-left",
    founded: "1916",
    leader: "Chris Hipkins",
    leaderRole: "Leader of the Opposition",
    headquarters: "Wellington",
    e: -0.35,
    g: 0.1,
    ideologyTags: ["Social democracy", "Labourism", "Progressivism"],
    title: "The New Zealand Labour Party: History, Ideology, and Policies",
    metaDesc: "A clear guide to the New Zealand Labour Party: its history, its centre-left ideology, where it stands on the economy and social issues, and its position in opposition under Chris Hipkins.",
    keywords: "new zealand labour party, what does labour believe, labour party nz ideology, chris hipkins, nz labour explained",
    summary: "New Zealand's main centre-left party, rooted in the labour movement, now in opposition under Chris Hipkins.",
    intro: "The New Zealand Labour Party is one of the country's two largest parties and the main force on the centre-left. It grew out of the labour movement and supports an active government role in the economy, public services, and workers' rights. After leading the government from 2017, it returned to opposition following the 2023 election and is led by Chris Hipkins.\n\nLabour has alternated in power with National for most of the past century and built much of New Zealand's welfare state.",
    history: "The party was founded in 1916 and formed its first government in 1935, creating a comprehensive welfare state and public housing programme that shaped modern New Zealand. It governed at key moments through the century, including a period of sweeping market reforms in the 1980s that divided the party.\n\nUnder Jacinda Ardern from 2017 the party led a government known internationally for its handling of major crises, and it won an outright majority in 2020. After Ardern resigned in early 2023, Chris Hipkins became leader, and Labour lost the 2023 election to National.",
    economic: "Labour supports a market economy guided by an active government. It favours investment in health, education, and housing, stronger workers' rights, and a role for government in reducing inequality and the cost of living. It generally supports a more expansive public sector than National.",
    social: "The party is broadly progressive. It supports action on climate change, the rights and settlements owed to Māori under the Treaty of Waitangi, LGBT equality, and a welcoming approach to diversity. It generally takes more liberal positions than National on social and environmental questions.",
    foreign: "Labour supports New Zealand's independent foreign policy, including the nuclear-free stance, and emphasises trade, multilateralism, and engagement with the Pacific. It balances traditional partnerships with an emphasis on regional relationships and climate diplomacy.",
    electoral: "Labour has formed many governments since 1935. It won a rare outright majority in 2020 under Jacinda Ardern before losing power at the 2023 election. It now sits in opposition ahead of the November 2026 general election.",
    positions: [
      "Supports a market economy with active government investment",
      "Backs investment in health, education, and housing",
      "Supports stronger workers' rights and reducing inequality",
      "Supports climate action and Treaty of Waitangi settlements",
      "More liberal than National on social questions",
      "Maintains New Zealand's independent, nuclear-free foreign policy"
    ],
    figures: [
      { name: "Michael Joseph Savage", role: "Prime Minister, 1935 to 1940", desc: "Led New Zealand's first Labour government and built the welfare state, remaining one of the country's most revered political figures." },
      { name: "Jacinda Ardern", role: "Prime Minister, 2017 to 2023", desc: "Led the party to an outright majority in 2020 and gained international attention for her handling of major national crises before resigning in 2023." },
      { name: "Chris Hipkins", role: "Leader of the Opposition", desc: "Became prime minister after Ardern's resignation in 2023 and now leads Labour in opposition." }
    ],
    sources: [
      { label: "New Zealand Labour Party (Wikipedia)", url: "https://en.wikipedia.org/wiki/New_Zealand_Labour_Party" },
      { label: "Official party website", url: "https://www.labour.org.nz/" },
      { label: "2026 New Zealand general election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2026_New_Zealand_general_election" }
    ]
  },

  "green-party-nz": {
    slug: "green-party-nz",
    country: "nz",
    countryName: "New Zealand",
    name: "Green Party of Aotearoa New Zealand",
    shortName: "Greens",
    color: "#098137",
    position: "Left-wing",
    founded: "1990",
    leader: "Marama Davidson and Chlöe Swarbrick",
    leaderRole: "Co-leaders of the Green Party",
    headquarters: "Wellington",
    e: -0.6,
    g: -0.2,
    ideologyTags: ["Green politics", "Eco-socialism", "Progressivism"],
    title: "The Green Party of Aotearoa New Zealand: History, Ideology, and Policies",
    metaDesc: "A clear guide to the Green Party of Aotearoa New Zealand: its history, its left-wing environmental ideology, and where it stands on climate, the economy, and social justice.",
    keywords: "green party new zealand, what do the greens believe, green party nz ideology, chloe swarbrick, nz greens explained",
    summary: "New Zealand's left-wing environmental party, combining climate action with social justice and Treaty-based politics.",
    intro: "The Green Party of Aotearoa New Zealand is the country's main environmental party and stands on the left of the political spectrum. It combines strong climate and environmental policy with a progressive social agenda and a commitment to the Treaty of Waitangi. The party is led by co-leaders and has become an established part of Parliament.\n\nThe Greens draw particular support among younger and urban voters and have at times supported or partnered with Labour-led governments.",
    history: "The party has its roots in the Values Party of the 1970s, one of the world's first national environmental parties, and became the Green Party in 1990. It later entered Parliament under New Zealand's proportional voting system introduced in 1996.\n\nThe Greens have grown steadily and have supported Labour-led governments through cooperation agreements, while retaining their independence. In recent years the party has continued to expand its vote and parliamentary presence under a co-leadership model.",
    economic: "The Greens support an economy reorganised around sustainability and fairness. They back strong climate action, large investment in public transport and clean energy, higher taxes on wealth and pollution, and expanded public services. They emphasise reducing inequality and protecting the natural environment.",
    social: "The party is firmly progressive. It supports Treaty-based partnership with Māori, LGBT rights, a humane approach to welfare and housing, and expanded civil liberties. It emphasises participatory democracy and social equality alongside environmental protection.",
    foreign: "The Greens favour a foreign policy centred on peace, human rights, disarmament, and climate justice. They strongly support New Zealand's nuclear-free stance and generally advocate lower military spending and an emphasis on diplomacy and the Pacific.",
    electoral: "The Greens have been represented in Parliament since the late 1990s and have grown into a durable third force. They have supported Labour-led governments through cooperation agreements while sitting outside or on the edge of cabinet, and they contest the 2026 election as an established party.",
    positions: [
      "Places climate and environmental action at the centre of policy",
      "Backs investment in public transport and clean energy",
      "Supports higher taxes on wealth and pollution",
      "Champions Treaty-based partnership with Māori",
      "Emphasises reducing inequality and improving housing",
      "Strongly supports the nuclear-free foreign policy"
    ],
    figures: [
      { name: "Rod Donald and Jeanette Fitzsimons", role: "Founding co-leaders", desc: "Led the modern Green Party into Parliament under proportional representation and established its enduring co-leadership tradition." },
      { name: "Chlöe Swarbrick", role: "Co-leader", desc: "A prominent younger co-leader known for campaigns on climate, housing, and youth engagement, who has helped broaden the party's appeal." }
    ],
    sources: [
      { label: "Green Party of Aotearoa NZ (Wikipedia)", url: "https://en.wikipedia.org/wiki/Green_Party_of_Aotearoa_New_Zealand" },
      { label: "Official party website", url: "https://www.greens.org.nz/" },
      { label: "2026 New Zealand general election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2026_New_Zealand_general_election" }
    ]
  },

  "act-new-zealand": {
    slug: "act-new-zealand",
    country: "nz",
    countryName: "New Zealand",
    name: "ACT New Zealand",
    shortName: "ACT",
    color: "#FDB912",
    position: "Right-wing, classical liberal",
    founded: "1994",
    leader: "David Seymour",
    leaderRole: "Leader of ACT and Deputy Prime Minister",
    headquarters: "Auckland",
    e: 0.6,
    g: -0.5,
    ideologyTags: ["Classical liberalism", "Libertarianism", "Free-market economics"],
    title: "ACT New Zealand: History, Ideology, and Policies",
    metaDesc: "A clear guide to ACT New Zealand: its history, its classical liberal and free-market ideology, where it stands on the economy and personal freedom, and its role in the coalition government.",
    keywords: "act new zealand, act party nz, what does act believe, act ideology, david seymour, nz act explained",
    summary: "A free-market, classical liberal party favouring lower taxes, smaller government, and individual freedom, and a partner in the current coalition government.",
    intro: "ACT New Zealand is a classical liberal and free-market party. It favours lower taxes, a much smaller government, individual freedom, and personal responsibility, combining economic liberalism with a generally liberal stance on personal choice. It is a partner in the coalition government led by the National Party, and its leader David Seymour serves as Deputy Prime Minister.\n\nThe party sits on the right of the economic spectrum while emphasising individual liberty, and it has grown significantly in recent elections.",
    history: "ACT was founded in 1994, its name drawn from the Association of Consumers and Taxpayers. It grew out of the market reforms of the 1980s and 1990s and entered Parliament under proportional representation, championing free-market economics and lower taxes.\n\nAfter a period as a very small party, ACT expanded markedly under David Seymour, becoming a significant force. Following the 2023 election it joined the National-led coalition government, with Seymour taking senior roles including, under the coalition agreement, the position of Deputy Prime Minister.",
    economic: "ACT strongly favours free markets, lower and flatter taxes, reduced government spending, and deregulation. It supports fiscal discipline, competition, and cutting what it sees as unnecessary bureaucracy. It is generally the most consistently free-market party in Parliament.",
    social: "On personal questions ACT leans liberal, emphasising individual freedom and choice. At the same time it has taken firm positions on law and order and has been prominent in debates about the role of the Treaty of Waitangi in law and policy, arguing for what it calls equal citizenship. Its overall emphasis is on individual rather than group rights.",
    foreign: "ACT supports free trade, the traditional partnerships of New Zealand, and a foreign policy grounded in national interests and open markets. It generally favours an outward-looking, trade-focused approach.",
    electoral: "ACT has been in Parliament since 1996, for years as a very small party, before expanding significantly under David Seymour. It entered government as part of the National-led coalition after the 2023 election and contests the 2026 election as an established partner of the centre-right.",
    positions: [
      "Strongly favours free markets and lower, flatter taxes",
      "Wants a much smaller government and less regulation",
      "Emphasises individual freedom and personal responsibility",
      "Argues for equal citizenship over group-based rights",
      "Takes firm positions on law and order",
      "Supports free trade and open markets"
    ],
    figures: [
      { name: "Roger Douglas", role: "Founder and reformer", desc: "A former Labour finance minister behind the sweeping market reforms of the 1980s who helped found ACT to continue that free-market agenda." },
      { name: "David Seymour", role: "Leader and Deputy Prime Minister", desc: "Grew ACT from a single seat into a significant party and brought it into government, taking senior roles including Deputy Prime Minister under the coalition agreement." }
    ],
    sources: [
      { label: "ACT New Zealand (Wikipedia)", url: "https://en.wikipedia.org/wiki/ACT_New_Zealand" },
      { label: "Official party website", url: "https://www.act.org.nz/" },
      { label: "Sixth National Government of New Zealand (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sixth_National_Government_of_New_Zealand" }
    ]
  },

  "nz-first": {
    slug: "nz-first",
    country: "nz",
    countryName: "New Zealand",
    name: "New Zealand First",
    shortName: "NZ First",
    color: "#000000",
    position: "Populist, centrist to right",
    founded: "1993",
    leader: "Winston Peters",
    leaderRole: "Leader of New Zealand First and Minister of Foreign Affairs",
    headquarters: "Wellington",
    e: 0.1,
    g: 0.4,
    ideologyTags: ["Populism", "Nationalism", "Economic nationalism"],
    title: "New Zealand First: History, Ideology, and Policies",
    metaDesc: "A clear guide to New Zealand First: its history, its populist and nationalist positioning, where it stands on immigration and the economy, and its role in the coalition government under Winston Peters.",
    keywords: "new zealand first, nz first party, what does nz first believe, nz first ideology, winston peters, nz first explained",
    summary: "A populist, nationalist party led by veteran politician Winston Peters, often a kingmaker in coalition governments.",
    intro: "New Zealand First is a populist and nationalist party led by Winston Peters, one of the country's most experienced and enduring politicians. It combines economic nationalism, a focus on the regions and older voters, and a firm stance on immigration and national identity. It is a partner in the coalition government led by the National Party.\n\nBecause of New Zealand's proportional voting system, New Zealand First has often held the balance of power, allowing it to choose which larger party governs and to shape policy from a central position.",
    history: "The party was founded in 1993 by Winston Peters after he broke from the National Party. It quickly established itself as a pivotal force, entering coalition with both major parties at different times over the following decades.\n\nNew Zealand First has moved in and out of Parliament as its vote has risen and fallen, but Peters has remained its constant leader. After the 2023 election it again entered government, this time in coalition with National and ACT, with Peters taking the role of Deputy Prime Minister for part of the term and the foreign affairs portfolio.",
    economic: "New Zealand First favours economic nationalism, supporting domestic industry, the regions, and older New Zealanders. It has backed measures such as regional development funds and protections for local ownership, and it tends to be sceptical of unrestrained globalisation. Its economic positioning is broadly centrist but shaped by a nationalist emphasis.",
    social: "The party is socially conservative in emphasis and nationalist in outlook. Immigration is one of its central issues, where it calls for tighter controls, and it stresses national identity, traditional values, and the interests of what it presents as ordinary New Zealanders against distant elites.",
    foreign: "New Zealand First supports an independent foreign policy and the country's traditional partnerships, with Peters serving as foreign minister in coalition governments. It emphasises national sovereignty, the Pacific, and a pragmatic approach to major powers.",
    electoral: "New Zealand First has repeatedly held the balance of power under proportional representation, entering coalition with both major parties over the years. It returned to government after the 2023 election alongside National and ACT and contests the 2026 election as an established coalition partner.",
    positions: [
      "Combines economic nationalism with a focus on the regions",
      "Calls for tighter controls on immigration",
      "Emphasises national identity and traditional values",
      "Supports domestic industry and local ownership",
      "Often holds the balance of power in coalition talks",
      "Backs an independent, sovereignty-focused foreign policy"
    ],
    figures: [
      { name: "Winston Peters", role: "Founder and long-standing leader", desc: "Founded New Zealand First in 1993 and has led it ever since, repeatedly holding the balance of power and serving in senior roles including Deputy Prime Minister and foreign minister." }
    ],
    sources: [
      { label: "New Zealand First (Wikipedia)", url: "https://en.wikipedia.org/wiki/New_Zealand_First" },
      { label: "Official party website", url: "https://www.nzfirst.nz/" },
      { label: "Sixth National Government of New Zealand (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sixth_National_Government_of_New_Zealand" }
    ]
  },

  "te-pati-maori": {
    slug: "te-pati-maori",
    country: "nz",
    countryName: "New Zealand",
    name: "Te Pāti Māori",
    shortName: "Te Pāti Māori",
    color: "#C8102E",
    position: "Left-wing, Indigenous rights",
    founded: "2004",
    leader: "Rawiri Waititi and Debbie Ngarewa-Packer",
    leaderRole: "Co-leaders of Te Pāti Māori",
    headquarters: "New Zealand",
    e: -0.5,
    g: -0.1,
    ideologyTags: ["Māori rights", "Indigenous politics", "Left-wing"],
    title: "Te Pāti Māori: History, Ideology, and Policies",
    metaDesc: "A clear guide to Te Pāti Māori, the Māori Party: its history, its focus on Māori rights and self-determination, and where it stands on the economy and social justice.",
    keywords: "te pati maori, maori party, what does te pati maori believe, te pati maori ideology, maori party nz explained",
    summary: "A party dedicated to Māori rights and self-determination, standing on the left and holding the Māori electorate seats.",
    intro: "Te Pāti Māori, also known as the Māori Party, is a party dedicated to advancing the rights, self-determination, and wellbeing of Māori, the Indigenous people of New Zealand. It stands on the left of the political spectrum and is led by co-leaders. It contests and holds several of the dedicated Māori electorate seats.\n\nThe party centres its politics on tino rangatiratanga, the principle of Māori self-determination, and on honouring the Treaty of Waitangi, the founding agreement between Māori and the Crown.",
    history: "The party was founded in 2004 after a dispute over foreshore and seabed legislation that many Māori felt disregarded their rights. It entered Parliament in 2005 and at times supported National-led governments while pursuing gains for Māori.\n\nAfter a period out of Parliament, the party returned in 2020 and grew its representation in the Māori electorates, becoming a prominent and often outspoken voice on Māori rights, particularly in debates over the place of the Treaty of Waitangi in law and policy.",
    economic: "Te Pāti Māori supports an economy that addresses inequality and delivers for Māori communities. It backs redistribution, investment in housing, health, and education for Māori, and economic development rooted in Māori enterprise and values. It generally favours a strong government role in reducing poverty and disadvantage.",
    social: "The party is progressive and centres Māori rights and culture. It champions the Treaty of Waitangi, the Māori language, and self-determination, alongside broadly progressive positions on social questions. It has been a leading voice against policies it sees as undermining Māori rights.",
    foreign: "As a party focused on Māori and domestic questions, Te Pāti Māori has a limited foreign policy platform, but it emphasises Indigenous solidarity internationally, human rights, and an independent foreign policy consistent with its values.",
    electoral: "The party first entered Parliament in 2005, left in 2017, and returned in 2020, since building its presence in the Māori electorate seats. Its influence rests on its strong voice for Māori rights and its potential role in close parliaments.",
    positions: [
      "Centres Māori rights and self-determination",
      "Champions the Treaty of Waitangi and the Māori language",
      "Supports redistribution and investment in Māori communities",
      "Backs strong action to reduce poverty and inequality",
      "Holds a progressive position on social questions",
      "Contests and holds the dedicated Māori electorate seats"
    ],
    figures: [
      { name: "Tariana Turia", role: "Founding co-leader", desc: "Left the Labour Party over foreshore and seabed legislation to help found the Māori Party in 2004, becoming a defining voice for Māori self-determination." },
      { name: "Rawiri Waititi", role: "Co-leader", desc: "A prominent co-leader known for his outspoken advocacy of Māori rights and self-determination in Parliament and public debate." }
    ],
    sources: [
      { label: "Te Pāti Māori (Wikipedia)", url: "https://en.wikipedia.org/wiki/M%C4%81ori_Party" },
      { label: "Official party website", url: "https://www.maoriparty.org/" },
      { label: "2026 New Zealand general election (Wikipedia)", url: "https://en.wikipedia.org/wiki/2026_New_Zealand_general_election" }
    ]
  }

};

// Portrait imagery, sourced from Wikimedia Commons under free licenses.
// Each carries the photographer, license, and a link back to the source
// file so the on-page credit line meets the attribution terms. Parties with
// no single leader use their most recent presidential nominee, captioned as
// such. All images are real photographs, not generated.
const PARTY_IMAGES = {
  "democratic-party": {
    src: "/images/party/democratic-party.webp",
    alt: "Kamala Harris, the Democratic Party's 2024 presidential nominee",
    caption: "Kamala Harris, the party's 2024 presidential nominee",
    credit: "Lawrence Jackson", license: "Public domain", licenseUrl: "",
    source: "https://commons.wikimedia.org/wiki/File:Kamala_Harris_Vice_Presidential_Portrait.jpg"
  },
  "republican-party": {
    src: "/images/party/republican-party.webp",
    alt: "Donald Trump, US President and the Republican Party's dominant figure",
    caption: "Donald Trump, US President and the party's dominant figure",
    credit: "Daniel Torok", license: "Public domain", licenseUrl: "",
    source: "https://commons.wikimedia.org/wiki/File:Official_Presidential_Portrait_of_President_Donald_J._Trump_(2025)_(cropped)(2).jpg"
  },
  "libertarian-party-us": {
    src: "/images/party/libertarian-party-us.webp",
    alt: "Chase Oliver, the Libertarian Party's 2024 presidential nominee",
    caption: "Chase Oliver, the party's 2024 presidential nominee",
    credit: "Gage Skidmore", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    source: "https://commons.wikimedia.org/wiki/File:Chase_Oliver_by_Gage_Skidmore_2.jpg"
  },
  "green-party-us": {
    src: "/images/party/green-party-us.webp",
    alt: "Jill Stein, the Green Party's 2024 presidential nominee",
    caption: "Jill Stein, the party's 2024 presidential nominee",
    credit: "Gage Skidmore", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    source: "https://commons.wikimedia.org/wiki/File:Jill_Stein_by_Gage_Skidmore_3.jpg"
  },
  "labour-party": {
    src: "/images/party/labour-party.webp",
    alt: "Keir Starmer, Prime Minister and leader of the Labour Party",
    caption: "Keir Starmer, Prime Minister and Labour leader",
    credit: "Prime Minister's Office", license: "OGL v3.0", licenseUrl: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    source: "https://commons.wikimedia.org/wiki/File:Prime_Minister_Keir_Starmer_Portrait_(cropped).jpg"
  },
  "conservative-party": {
    src: "/images/party/conservative-party.webp",
    alt: "Kemi Badenoch, Leader of the Opposition and Conservative Party leader",
    caption: "Kemi Badenoch, Leader of the Opposition",
    credit: "Roger Harris, UK Parliament", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    source: "https://commons.wikimedia.org/wiki/File:Official_portrait_of_Kemi_Badenoch_MP,_2024_(3x4_cropped).jpg"
  },
  "liberal-democrats": {
    src: "/images/party/liberal-democrats.webp",
    alt: "Ed Davey, leader of the Liberal Democrats",
    caption: "Ed Davey, leader of the Liberal Democrats",
    credit: "UK Parliament", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    source: "https://commons.wikimedia.org/wiki/File:Official_portrait_of_Ed_Davey_MP_crop_2,_2024.jpg"
  },
  "reform-uk": {
    src: "/images/party/reform-uk.webp",
    alt: "Nigel Farage, leader of Reform UK",
    caption: "Nigel Farage, leader of Reform UK",
    credit: "Laurie Noble, UK Parliament", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    source: "https://commons.wikimedia.org/wiki/File:Official_portrait_of_Nigel_Farage_MP_(3x4_cropped).jpg"
  },
  "green-party-ew": {
    src: "/images/party/green-party-ew.webp",
    alt: "Zack Polanski, leader of the Green Party of England and Wales",
    caption: "Zack Polanski, leader of the Green Party of England and Wales",
    credit: "Bristol Green Party", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: "https://commons.wikimedia.org/wiki/File:Green_Party_Group_Shot_6_(cropped2).jpg"
  },
  "snp": {
    src: "/images/party/snp.webp",
    alt: "John Swinney, First Minister of Scotland and SNP leader",
    caption: "John Swinney, First Minister of Scotland and SNP leader",
    credit: "Scottish Government", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    source: "https://commons.wikimedia.org/wiki/File:First_Minister_John_Swinney_(cropped).jpg"
  },
  "restore-britain": {
    src: "/images/party/restore-britain.webp",
    alt: "Rupert Lowe, founder and leader of Restore Britain",
    caption: "Rupert Lowe, founder and leader of Restore Britain",
    credit: "UK Parliament", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    source: "https://commons.wikimedia.org/wiki/File:Official_portrait_of_Rupert_Lowe_MP_crop_2.jpg"
  },

  "liberal-party-canada": {
    src: "/images/party/liberal-party-canada.webp",
    alt: "Mark Carney, Prime Minister of Canada and Liberal leader",
    caption: "Mark Carney, Prime Minister and Liberal leader",
    credit: "Lea-Kim", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:2025-11-14_InaugurationREM_Deux-Montagnes_Mark_Carney.jpg"
  },
  "conservative-party-canada": {
    src: "/images/party/conservative-party-canada.webp",
    alt: "Pierre Poilievre, Leader of the Opposition and Conservative Party of Canada leader",
    caption: "Pierre Poilievre, Leader of the Opposition",
    credit: "Humberland", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: "https://commons.wikimedia.org/wiki/File:Pierre_Poilievre_in_2023_(edited).jpg"
  },
  "new-democratic-party": {
    src: "/images/party/new-democratic-party.webp",
    alt: "The Parliament of Canada on Parliament Hill in Ottawa",
    caption: "The Parliament of Canada in Ottawa. The NDP is rebuilding under an interim leader.",
    credit: "Wladyslaw", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    source: "https://commons.wikimedia.org/wiki/File:Ottawa_-_ON_-_Stadtansicht.jpg"
  },
  "green-party-canada": {
    src: "/images/party/green-party-canada.webp",
    alt: "Elizabeth May, parliamentary leader of the Green Party of Canada",
    caption: "Elizabeth May, the party's long-standing leader",
    credit: "Marcus Redivo / Green Party of Canada", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Elizabeth_May_in_July_2014.jpg"
  },
  "bloc-quebecois": {
    src: "/images/party/bloc-quebecois.webp",
    alt: "Yves-François Blanchet, leader of the Bloc Québécois",
    caption: "Yves-François Blanchet, leader of the Bloc Québécois",
    credit: "TVA Nouvelles", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    source: "https://commons.wikimedia.org/wiki/File:Yves-Fran%C3%A7ois_Blanchet_Entrevue_no_smile_2023_(cropped).png"
  },
  "peoples-party-canada": {
    src: "/images/party/peoples-party-canada.webp",
    alt: "Maxime Bernier, founder and leader of the People's Party of Canada",
    caption: "Maxime Bernier, founder and leader of the party",
    credit: "Yan Parisien", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Maxime_Bernier_portrait_by_Yan_Parisien_2023_(3x4_cropped).png"
  },

  "labor-party-australia": {
    src: "/images/party/labor-party-australia.webp",
    alt: "Anthony Albanese, Prime Minister of Australia and Labor leader",
    caption: "Anthony Albanese, Prime Minister and Labor leader",
    credit: "Australian Government", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Anthony_Albanese_portrait_(re-crop).jpg"
  },
  "liberal-party-australia": {
    src: "/images/party/liberal-party-australia.webp",
    alt: "Sussan Ley, Leader of the Opposition and Liberal Party of Australia leader",
    caption: "Sussan Ley, Leader of the Opposition",
    credit: "Commonwealth of Australia", license: "CC BY 3.0 AU", licenseUrl: "https://creativecommons.org/licenses/by/3.0/au/",
    source: "https://commons.wikimedia.org/wiki/File:Sussan_Ley_2019_(Higher_Quality).jpg"
  },
  "national-party-australia": {
    src: "/images/party/national-party-australia.webp",
    alt: "David Littleproud, leader of the National Party of Australia",
    caption: "David Littleproud, leader of the National Party",
    credit: "Commonwealth of Australia", license: "CC BY 3.0 AU", licenseUrl: "https://creativecommons.org/licenses/by/3.0/au/",
    source: "https://commons.wikimedia.org/wiki/File:David_Littleproud.jpg"
  },
  "australian-greens": {
    src: "/images/party/australian-greens.webp",
    alt: "Larissa Waters, leader of the Australian Greens",
    caption: "Larissa Waters, leader of the Australian Greens",
    credit: "The Australian Greens", license: "CC BY-SA 2.5 AU", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5/au/",
    source: "https://commons.wikimedia.org/wiki/File:Larissa_Waters_2025_campaign_portrait.jpg"
  },
  "teal-independents": {
    src: "/images/party/teal-independents.webp",
    alt: "Parliament House in Canberra, Australia",
    caption: "Parliament House in Canberra. The teals are independents, not a single party.",
    credit: "Thennicke", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Parliament_House_at_dusk,_Canberra_ACT.jpg"
  },

  "national-party-nz": {
    src: "/images/party/national-party-nz.webp",
    alt: "Christopher Luxon, Prime Minister of New Zealand and National Party leader",
    caption: "Christopher Luxon, Prime Minister and National leader",
    credit: "New Zealand National Party", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:LUXON,_Christopher_-_Botany_(cropped).png"
  },
  "labour-party-nz": {
    src: "/images/party/labour-party-nz.webp",
    alt: "Chris Hipkins, Leader of the Opposition and New Zealand Labour Party leader",
    caption: "Chris Hipkins, Leader of the Opposition",
    credit: "New Zealand Labour Party", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Chris_Hipkins_NZ_Labour_(2).jpg"
  },
  "green-party-nz": {
    src: "/images/party/green-party-nz.webp",
    alt: "Chlöe Swarbrick, co-leader of the Green Party of Aotearoa New Zealand",
    caption: "Chlöe Swarbrick, Green Party co-leader",
    credit: "R100gsrider", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Chl%C3%B6e_Swarbrick_headshot.jpg"
  },
  "act-new-zealand": {
    src: "/images/party/act-new-zealand.webp",
    alt: "David Seymour, ACT New Zealand leader and Deputy Prime Minister",
    caption: "David Seymour, ACT leader and Deputy Prime Minister",
    credit: "Doug Mountain", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: "https://commons.wikimedia.org/wiki/File:David_Seymour_2023_(cropped)_(cropped).jpg"
  },
  "nz-first": {
    src: "/images/party/nz-first.webp",
    alt: "Winston Peters, leader of New Zealand First and Minister of Foreign Affairs",
    caption: "Winston Peters, leader of New Zealand First",
    credit: "US Embassy, New Zealand", license: "Public domain", licenseUrl: "",
    source: "https://commons.wikimedia.org/wiki/File:Winston_Peters_2024_US_Deputy_Secretary_visit_(further_crop).jpg"
  },
  "te-pati-maori": {
    src: "/images/party/te-pati-maori.webp",
    alt: "Rawiri Waititi, co-leader of Te Pāti Māori",
    caption: "Rawiri Waititi, co-leader of Te Pāti Māori",
    credit: "Ministry of Foreign Affairs of Japan", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0",
    source: "https://commons.wikimedia.org/wiki/File:Rawiri_Waititi_August_2025.jpg"
  }
};

const PARTY_COUNTRIES = {
  us: {
    code: "us",
    name: "United States",
    flag: "\u{1F1FA}\u{1F1F8}",
    title: "US Political Parties Explained: Democrats, Republicans, and More",
    metaDesc: "A clear, up-to-date guide to the major political parties in the United States. Compare the Democrats, Republicans, Libertarians, and Greens: their ideologies, policies, and where they stand.",
    keywords: "us political parties, american political parties explained, democrats vs republicans, political parties usa, us parties ideology",
    intro: "The United States has a two-party system in which the Democratic Party and the Republican Party dominate national politics. Third parties such as the Libertarians and the Greens contest elections and shape debate but rarely win federal office, in part because the electoral system tends to favour two large parties.\n\nThis guide sets out where each major party stands: its history, its core ideology, and its positions on the economy, social questions, and foreign policy. Use it to understand the American political landscape, then take the test to see where your own views fall.",
    order: ["democratic-party", "republican-party", "libertarian-party-us", "green-party-us"]
  },
  uk: {
    code: "uk",
    name: "United Kingdom",
    flag: "\u{1F1EC}\u{1F1E7}",
    title: "UK Political Parties Explained: Labour, Conservatives, Reform, and More",
    metaDesc: "A clear, up-to-date guide to the political parties of the United Kingdom. Compare Labour, the Conservatives, the Liberal Democrats, Reform UK, the Greens, the SNP, and Restore Britain.",
    keywords: "uk political parties, british political parties explained, labour vs conservative, reform uk, uk parties ideology, political parties britain",
    intro: "The United Kingdom has a multi-party system dominated historically by the Labour Party and the Conservative Party, but with a growing number of significant challengers. The Liberal Democrats occupy the centre, Reform UK and Restore Britain compete on the right, the Greens on the left, and the SNP dominates in Scotland. The devolved nations of Scotland and Wales have their own distinctive party landscapes.\n\nThis guide sets out where each party stands: its history, its core ideology, and its positions on the economy, social questions, and foreign policy. Use it to understand the British political landscape, then take the test to see where your own views fall.",
    order: ["labour-party", "conservative-party", "liberal-democrats", "reform-uk", "green-party-ew", "snp", "restore-britain"]
  },
  ca: {
    code: "ca",
    name: "Canada",
    flag: "\u{1F1E8}\u{1F1E6}",
    title: "Canadian Political Parties Explained: Liberals, Conservatives, and More",
    metaDesc: "A clear, up-to-date guide to the political parties of Canada. Compare the Liberals, Conservatives, NDP, Greens, Bloc Québécois, and the People's Party: their ideologies and where they stand.",
    keywords: "canadian political parties, canada political parties explained, liberals vs conservatives canada, canada parties ideology",
    intro: "Canada has a multi-party system in which the Liberal Party and the Conservative Party are the two largest forces and the main contenders for government. The New Democratic Party sits on the left, the Greens focus on the environment, the Bloc Québécois runs only in Quebec on a sovereigntist platform, and the People's Party competes on the populist right. Canada's parliamentary system frequently produces minority governments in which smaller parties hold influence.\n\nThis guide sets out where each party stands: its history, its core ideology, and its positions on the economy, social questions, and foreign policy. Use it to understand the Canadian political landscape, then take the test to see where your own views fall.",
    order: ["liberal-party-canada", "conservative-party-canada", "new-democratic-party", "green-party-canada", "bloc-quebecois", "peoples-party-canada"]
  },
  au: {
    code: "au",
    name: "Australia",
    flag: "\u{1F1E6}\u{1F1FA}",
    title: "Australian Political Parties Explained: Labor, Liberals, and More",
    metaDesc: "A clear, up-to-date guide to the political parties of Australia. Compare Labor, the Liberals, the Nationals, the Greens, and the Teal Independents: their ideologies and where they stand.",
    keywords: "australian political parties, australia political parties explained, labor vs liberal australia, australia parties ideology",
    intro: "Australia has a two-party contest at its core, between the centre-left Australian Labor Party and the centre-right Liberal-National Coalition, but with important smaller forces. The Nationals represent rural and regional Australia in coalition with the Liberals, the Greens lead on the left, and the Teal Independents have reshaped competition in affluent urban seats. Australia's preferential voting system shapes how these parties compete and cooperate.\n\nThis guide sets out where each party stands: its history, its core ideology, and its positions on the economy, social questions, and foreign policy. Use it to understand the Australian political landscape, then take the test to see where your own views fall.",
    order: ["labor-party-australia", "liberal-party-australia", "national-party-australia", "australian-greens", "teal-independents"]
  },
  nz: {
    code: "nz",
    name: "New Zealand",
    flag: "\u{1F1F3}\u{1F1FF}",
    title: "New Zealand Political Parties Explained: National, Labour, and More",
    metaDesc: "A clear, up-to-date guide to the political parties of New Zealand. Compare National, Labour, the Greens, ACT, New Zealand First, and Te Pāti Māori: their ideologies and where they stand.",
    keywords: "new zealand political parties, nz political parties explained, national vs labour nz, new zealand parties ideology",
    intro: "New Zealand uses a proportional voting system that supports a genuine multi-party landscape. The centre-right National Party and centre-left Labour Party are the two largest, but government usually depends on coalitions. ACT sits on the free-market right, New Zealand First occupies a populist and nationalist space, the Greens lead on the left, and Te Pāti Māori champions Māori rights. The current government is a coalition of National, ACT, and New Zealand First.\n\nThis guide sets out where each party stands: its history, its core ideology, and its positions on the economy, social questions, and foreign policy. Use it to understand the New Zealand political landscape, then take the test to see where your own views fall.",
    order: ["national-party-nz", "labour-party-nz", "green-party-nz", "act-new-zealand", "nz-first", "te-pati-maori"]
  }
};
