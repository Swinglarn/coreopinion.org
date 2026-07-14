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
  }
};
