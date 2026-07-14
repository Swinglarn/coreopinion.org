// US party guide content. Written for human readers first: plain language,
// no em dashes, concrete facts, neutral tone. Dates current as of mid-2026.
module.exports = {
  hub: {
    slug: 'us',
    country: 'United States',
    title: 'US Political Parties Explained: Ideologies, Positions and History',
    desc: 'A clear guide to American political parties. What Democrats, Republicans, Libertarians and Greens actually stand for, how they differ, and where they came from.',
    header: 'US Political Parties',
    subtitle: 'What each American party actually stands for, in plain language. Ideologies, key policy positions, history and current standing.',
    testUrl: '/us',
    testCta: 'Not sure which party matches your views? Take the US political test and see your alignment across all of them.',
    introHtml: `
<p>American politics is dominated by two parties, the Democratic Party and the Republican Party, and has been since the 1850s. The winner-take-all voting system used in most American elections makes it very hard for smaller parties to win seats, which is why the same two names appear on almost every ballot. Smaller parties still matter though. The Libertarian Party and the Green Party regularly appear on ballots in most states, shape debates on issues the major parties avoid, and occasionally pull enough votes to decide close races.</p>
<p>As of mid-2026, the Republican Party holds the presidency under Donald Trump and majorities in both chambers of Congress, though the House margin is narrow. The Democratic Party rebounded in the November 2025 off-year elections, winning the governorships of Virginia and New Jersey, and both parties are now focused on the midterm elections in November 2026, which will decide control of Congress for the second half of the presidential term.</p>
<p>The guides below cover each party in depth: where it came from, what it believes, what it has done recently and who votes for it. Each page links to primary sources so you can verify anything you read here.</p>`
  },
  parties: [
    {
      slug: 'democratic-party',
      name: 'Democratic Party',
      title: 'Democratic Party (US): Ideology, Positions and History',
      desc: 'What the Democratic Party stands for: its centre-left platform, policy positions on healthcare, climate and the economy, its history since 1828 and its current standing.',
      subtitle: 'The centre-left of American politics. One of the two major US parties and among the oldest active political parties in the world.',
      infobox: [
        { label: 'Founded', value: '1828' },
        { label: 'Political position', value: 'Centre-left' },
        { label: 'Ideology', value: 'Modern liberalism, social liberalism' },
        { label: 'National chair', value: 'Ken Martin (DNC)' },
        { label: 'Website', value: 'democrats.org', url: 'https://democrats.org' },
        { label: 'Wikipedia', value: 'Democratic Party (United States)', url: 'https://en.wikipedia.org/wiki/Democratic_Party_(United_States)' }
      ],
      sections: [
        { h2: 'Overview', html: `
<p>The Democratic Party is one of the two major political parties in the United States and sits on the centre-left of the American spectrum. Founded in 1828 around Andrew Jackson, it is among the oldest active political parties in the world. Its modern identity took shape under Franklin D. Roosevelt in the 1930s, when the New Deal established the party as the advocate of an active federal government, social insurance and organised labour.</p>
<p>Today the party supports expanded access to healthcare, abortion rights, action on climate change, tighter gun laws and a higher federal minimum wage. It draws its strongest support from urban areas, college-educated voters, younger voters and most racial and ethnic minority groups.</p>` },
        { h2: 'History in brief', html: `
<p>The party began as a coalition behind Andrew Jackson, championing the interests of small farmers against banking and commercial elites. For much of the nineteenth century it was the dominant party of the American South. The great reversal came in the twentieth century. Roosevelt's New Deal coalition brought together workers, immigrants and northern liberals, and the party's embrace of civil rights legislation in the 1960s under Lyndon Johnson completed the realignment, trading its old southern base for lasting support among Black voters.</p>
<p>Bill Clinton moved the party toward the centre in the 1990s with a focus on balanced budgets and welfare reform. Barack Obama's presidency delivered the Affordable Care Act in 2010, the largest expansion of health coverage in decades. Joe Biden's single term produced major legislation on infrastructure, semiconductors and clean energy before his withdrawal from the 2024 race. Kamala Harris took over the nomination and lost to Donald Trump that November.</p>` },
        { h2: 'Ideology and policy positions', html: `
<p>Democrats broadly favour a mixed economy in which the federal government corrects market failures and funds a social safety net. In practice the party contains a wide range, from moderates who emphasise fiscal restraint to a progressive wing that campaigns for universal public healthcare and much higher taxes on wealth.</p>
<ul>
<li><strong>Economy:</strong> higher taxes on corporations and top earners, a higher federal minimum wage, support for unions and antitrust enforcement.</li>
<li><strong>Healthcare:</strong> defending and expanding the Affordable Care Act. The progressive wing backs Medicare for All; the party leadership favours a public option instead.</li>
<li><strong>Climate:</strong> rejoining and honouring international climate commitments, clean energy subsidies such as those in the Inflation Reduction Act of 2022, and emission limits on power plants and vehicles.</li>