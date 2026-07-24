export interface ActivityStep {
  title: string;
  detail: string;
  minutes?: string;
}

export interface CultureActivity {
  id: number;
  week: number;
  title: string;
  category: 'Staff Culture' | 'Student Belonging' | 'Family & Community' | 'Leader';
  month: string;
  monthIndex: number;
  theme: string;
  description: string;
  icon: string;
  freePreview?: boolean;
  code?: string;
  promise?: string;
  timeDisplay?: string;
  timeMinutes?: number;
  cost?: string;
  leavesBehind?: string;
  leaderGoesFirst?: boolean;
  beWord?: string;
  lane?: string;
  objective?: string;
  supplies?: string[];
  steps?: ActivityStep[];
  whyItWorks?: string[];
  leaderScript?: string;
  facilitatorTips?: string[];
}

export const monthThemes: { month: string; theme: string; monthIndex: number; blurb: string }[] = [
  { month: 'July', theme: 'Renewal & Preparation', monthIndex: -1, blurb: 'Before the year begins, the leader names the one sentence everything else gets measured against.' },
  { month: 'August', theme: 'Welcome & Belonging', monthIndex: 0, blurb: 'Set the tone for the year with warm welcomes and shared norms.' },
  { month: 'September', theme: 'Establishing Identity', monthIndex: 1, blurb: 'Build traditions, define roles, and celebrate early wins.' },
  { month: 'October', theme: 'Connection & Recognition', monthIndex: 2, blurb: 'Deepen bonds through team-building, spirit, and kindness.' },
  { month: 'November', theme: 'Gratitude', monthIndex: 3, blurb: 'Make thankfulness visible across staff, students, and families.' },
  { month: 'December', theme: 'Celebration & Care', monthIndex: 4, blurb: 'Honor the season with joy, rest, and support for those in need.' },
  { month: 'January', theme: 'Fresh Start & Goals', monthIndex: 5, blurb: 'Re-center on vision and set goals for the second half.' },
  { month: 'February', theme: 'Kindness & Belonging', monthIndex: 6, blurb: 'Make kindness a daily practice and inclusion a habit.' },
  { month: 'March', theme: 'Perseverance', monthIndex: 7, blurb: 'Sustain morale through the long stretch with wellness and effort.' },
  { month: 'April', theme: 'Appreciation', monthIndex: 8, blurb: 'Recognize the quiet contributors and celebrate the community.' },
  { month: 'May', theme: 'Celebration & Legacy', monthIndex: 9, blurb: 'Honor the year\u2019s work and send everyone off with pride.' },
  { month: 'June', theme: 'Reflection & Closure', monthIndex: 10, blurb: 'Close the year with gratitude, recognition, and connection.' },
];

const iconMap: Record<string, string> = {
  'Staff Culture': 'Users',
  'Student Belonging': 'HeartHandshake',
  'Family & Community': 'Home',
  'Leader': 'Compass',
};

export const activities: CultureActivity[] = [
  // July — Renewal & Preparation (Leader lane, free preview)
  {
    id: 0,
    week: 1,
    title: "Name Next Year's Culture in One Sentence",
    category: 'Leader',
    month: 'July',
    monthIndex: -1,
    theme: 'Renewal & Preparation',
    description:
      'Write the one sentence every decision this year gets measured against, in under 25 minutes, before anyone else is in the building.',
    icon: iconMap['Leader'],
    freePreview: true,
    code: 'CB-01',
    promise: 'Write the one sentence every decision this year gets measured against.',
    timeDisplay: '20–25 minutes',
    timeMinutes: 25,
    cost: '$0',
    leavesBehind:
      'A dated one-sentence culture statement, posted where the leader sees it daily.',
    leaderGoesFirst: true,
    beWord: 'BE Ready',
    lane: 'Leader',
    objective:
      'Before you build a single agenda, name in one sentence what you want it to feel like to work at and attend your school this year. Not a mission statement written by committee. One sentence, in your own words, that you can say out loud in the parking lot without notes. Everything downstream this year hangs off it: your BE words, your pre-service agenda, what you praise in a staff meeting, what you refuse to add to a Tuesday.',
    supplies: [
      'Paper and a pen. Not a doc. Handwriting is slow enough to make you think.',
      'A timer.',
      'A room where nobody can find you for half an hour.',
      "Optional but useful: last year's staff climate survey, exit interview notes, or the last round of end-of-year feedback.",
    ],
    steps: [
      {
        title: 'Look back',
        minutes: '5 min',
        detail:
          'Write down three moments from last year you would want to happen again, and one you never want to repeat. Real moments with names and dates, not themes. "The day Marcy\'s whole team covered her classes after the funeral" beats "collaboration."',
      },
      {
        title: 'Find the through-line',
        minutes: '5 min',
        detail:
          'Read the four moments. Ask one question: what were the good three giving people that the bad one took away? Write that in a few plain words. Being trusted. Being noticed. Not being alone.',
      },
      {
        title: 'Draft the sentence',
        minutes: '7 min',
        detail:
          'Complete this: "This year, [school] is a place where ______." One clause. No "and." If you need an "and," you have two sentences and you have to pick one.',
      },
      {
        title: 'Run the parking lot test',
        minutes: '3 min',
        detail:
          'Stand up and say it out loud without reading it. If you stumble, or you feel a little embarrassed by how it sounds, it is too corporate. Rewrite it the way you would say it to the one teacher you trust most.',
      },
      {
        title: 'Post it and date it',
        minutes: '5 min',
        detail:
          'Top of your planning doc, taped inside a cabinet door, back of your office door. Somewhere you see it without looking for it. Write the date on it.',
      },
    ],
    whyItWorks: [
      'A culture statement you cannot say from memory will not survive October. The parking lot test filters out any language you do not actually own.',
      'One clause forces a priority. "Safe and rigorous and joyful and collaborative" is not a priority, it is a wish list, and a wish list cannot settle an argument in February.',
      'Anchoring on specific moments instead of adjectives keeps you honest. You end up describing your actual school instead of a brochure.',
      'Everything downstream now has a test to pass. Decisions get faster because most of them stop being judgment calls.',
      'Doing this in July means the sentence shapes the year. Doing it in June means it only describes one.',
    ],
    leaderScript:
      '"I\'m not going to hand you a mission statement today. I wrote one sentence this summer about what I want it to feel like to work here. Here it is: ______. I\'m not asking you to agree with it yet. I\'m telling you it\'s the thing I\'ll be making decisions against this year, so you can hold me to it."',
    facilitatorTips: [
      'Stuck on the sentence? Try the alternate stem: "By June, I want a teacher here to tell a friend that ______."',
      'Do not crowdsource this in July. Bring the draft to staff in August and let them push on it. A leader who shows up with nothing reads as directionless. A leader who shows up with a finished plaque reads as closed. A draft reads as honest.',
      'Send it to one person who will actually tell you if it is mush. A spouse, a mentor, the assistant principal who is not afraid of you.',
      'Keep the paper. June, Week 3 ("What We Keep, What We Kill") asks you to grade the year against this exact sentence.',
    ],
  },

  {
    id: -1,
    week: 2,
    title: 'Pick Your BE Words',
    category: 'Leader',
    month: 'July',
    monthIndex: -1,
    theme: 'Renewal & Preparation',
    description:
      'Choose three to five BE words that make your one-sentence culture statement visible in everyday behavior. Not values on a poster — behaviors a person can actually do.',
    icon: iconMap['Leader'],
    freePreview: true,
    code: 'CB-02',
    promise: 'Choose three to five BE words that make your one-sentence culture statement visible in everyday behavior, before the year begins.',
    timeDisplay: '30–40 minutes',
    timeMinutes: 40,
    cost: '$0',
    leavesBehind:
      'A short list of three to five BE words, posted beside the culture sentence, that staff and students will hear all year.',
    leaderGoesFirst: true,
    beWord: 'BE Ready',
    lane: 'Leader',
    objective:
      'You wrote the sentence in CB-01. Now you need the words. BE words are short, present-tense verbs that name the behaviors your culture demands. Not values on a poster — behaviors a person can actually do. "Be kind" is a behavior. "Integrity" is a poster. The BE words are how the sentence walks around the building. Three to five words. No more. A school with eight BE words has none, because no one can remember eight. A school with three has a culture you can say in one breath. This activity takes the sentence you wrote in July and distills it into the handful of words that will anchor every staff meeting, every morning announcement, every conversation with a struggling student for the rest of the year.',
    supplies: [
      'The one-sentence culture statement from CB-01, in front of you.',
      'Paper and pen. Still not a doc.',
      'A timer.',
      'Optional: the BE word bank below, printed or on a screen.',
    ],
    steps: [
      {
        title: 'Re-read the sentence',
        minutes: '5 min',
        detail:
          'Read your culture sentence out loud. Then ask one question: what would a person have to do, every day, for that sentence to be true? Not what would they believe. What would they do. Write down every verb you can think of. Listen. Notice. Speak up. Show up. Stay. These are candidates, not decisions.',
      },
      {
        title: 'Find the behaviors hiding in the sentence',
        minutes: '10 min',
        detail:
          'Look at your verb list. Cross out any that are attitudes, not actions. "Care" is an attitude. "Notice" is an action. "Believe" is an attitude. "Show up" is an action. You want verbs a student can do in a hallway at 8:15 in the morning. Keep only the verbs that pass that test. You should have 8 to 12 left.',
      },
      {
        title: 'Cluster and cut to three to five',
        minutes: '10 min',
        detail:
          'Group the remaining verbs. "Notice" and "listen" might be one word. "Show up" and "stay" might be one word. Cut until you have three to five clusters. Not six. Not seven. Three to five. The cutting is the work. Every word you cut is a word you are choosing not to say all year. That is the point. Fewer words, said more often, land harder.',
      },
      {
        title: 'Put BE in front of each one',
        minutes: '5 min',
        detail:
          'Write each word as a BE statement. "Be visible." "Be kind." "Be the one." Short enough for a student to say. Short enough for a staff member to remember in November. If a word needs a second word to make sense, keep it. "Be the one" is fine. "Be the one who steps up when no one else does" is a paragraph, not a word.',
      },
      {
        title: 'Test them against the sentence',
        minutes: '5 min',
        detail:
          'Read the sentence. Then read the BE words. Ask: if everyone did these things, would the sentence be true? If yes, you are done. If no, you have the wrong words. Go back to step 2.',
      },
    ],
    whyItWorks: [
      'Behaviors, not values. "Integrity" is a value. "Be honest" is a behavior. A student can do "be honest." A student cannot do "integrity." The BE words work because they are instructions, not adjectives.',
      'Three to five is the limit of human recall. A staff member in a hard moment will reach for one word, not seven. If you give them three, they will use one. If you give them eight, they will use none. Fewer words, said more often, become the language of the school.',
      'BE words make the sentence portable. The culture sentence lives in the leader\'s office. The BE words live in the hallway, the classroom, the phone call home. They are the sentence broken into pieces small enough to carry.',
      'Present tense is the mechanism. "Be kind" is a command you can do right now. "Kindness" is a noun you think about. The grammar matters. Commands change behavior. Nouns decorate walls.',
      'The words you cut matter more than the words you keep. Every word you cut is a commitment to not dilute the ones you kept. A school that says five BE words all year is louder than a school that says fifteen.',
    ],
    leaderScript:
      '"I wrote a sentence this summer about what I want this place to feel like. Then I asked: what would we have to do every day for that to be true? I landed on three words. Be visible. Be kind. Be the one. That\'s it. Not seven. Three. I\'m going to say them a lot. I\'m going to say them in meetings, in the hallway, in the hard conversations. Not because they are magic. Because if I say them enough, they become the way we talk about what we do here. And the way we talk becomes the way we act."',
    facilitatorTips: [
      'Do this the same week as CB-01, or the week after. The sentence and the words are one thought in two forms. If you wait until August, the sentence will have gone cold and you will be picking words from a memory, not from the page.',
      'Do not crowdsource the BE words with staff. You crowdsource norms in August. You do not crowdsource the BE words. The words are the leader\'s, derived from the leader\'s sentence. If staff want to add words, let them push on your draft — but bring the draft.',
      'If you are stuck, walk the building. Walk the hallways, the cafeteria, the front office. Watch what people are already doing well. Name it. "She is always the one who notices when a kid is off." That is "Be the one who notices." The BE words are already in your building. You are naming them, not inventing them.',
      'One of the words should be hard. "Be kind" is easy. "Be the one" is hard, because it means stepping up when no one else does. If all your words are easy, you do not have words. You have a poster. One hard word keeps the list honest.',
      'Post the BE words next to the culture sentence, not instead of it. The sentence is the why. The words are the how. They need each other. A sentence without words is a wish. Words without a sentence are a list.',
      'In January, do not add words. Do not swap words. If the words are not working by January, the problem is not the words. The problem is that you stopped saying them. Start saying them again.',
    ],
  },

  {
    id: -2,
    week: 3,
    title: 'Design Your Pre-Service Week',
    category: 'Leader',
    month: 'July',
    monthIndex: -1,
    theme: 'Renewal & Preparation',
    description:
      'Sketch the pre-service week agenda before August, so the first time staff gather is intentional — not inherited from last year\'s template. Build the week around the culture sentence and BE words.',
    icon: iconMap['Leader'],
    freePreview: true,
    code: 'CB-03',
    promise: 'Sketch the pre-service week agenda before August, so the first time staff gather is intentional — not inherited from last year\'s template.',
    timeDisplay: '45–60 minutes',
    timeMinutes: 60,
    cost: '$0',
    leavesBehind:
      'A one-page pre-service week agenda, built around the culture sentence and BE words, ready to send to staff in August.',
    leaderGoesFirst: true,
    beWord: 'BE Intentional',
    lane: 'Leader',
    objective:
      'Pre-service week is the most important week of the year. It is the week staff form their first impression of you, of each other, and of what this year will ask of them. Most leaders inherit the agenda from the year before — the same PowerPoint, the same district compliance modules, the same lunch. That inherited agenda is a missed opportunity. The pre-service week is when the culture sentence from CB-01 and the BE words from CB-02 either land or die. If the week is built around them, the words become real. If the week is built around compliance, the words become a poster. This activity is the leader, alone in July, designing the week so that every minute serves the culture you said you wanted.',
    supplies: [
      'The one-sentence culture statement from CB-01.',
      'The three to five BE words from CB-02.',
      'A blank weekly calendar — Monday through Friday, with time blocks.',
      'Paper and pen.',
      'Last year\'s pre-service agenda (to see what you are replacing).',
      'Any district-mandated compliance items and their required time.',
    ],
    steps: [
      {
        title: 'List the non-negotiables',
        minutes: '10 min',
        detail:
          'Write down every thing the district requires — compliance modules, safety training, mandated reporter, bloodborne pathogens. Write the required minutes next to each. These are fixed. You cannot cut them. But you can control when they happen. Put them in the least-culture-critical slots — Friday afternoon, after lunch, the slots where nobody is forming an impression of anything.',
      },
      {
        title: 'Block the culture moments first',
        minutes: '15 min',
        detail:
          'Before you schedule anything else, block these three moments on the calendar. Monday morning: the leader tells the culture story — the sentence, the BE words, and why they matter. Not a PowerPoint. A story. 30 minutes. Tuesday morning: staff do CB-01 together — they push on the sentence, they make it theirs. 45 minutes. Wednesday: staff co-create norms, grounded in the BE words. 60 minutes. These three blocks are the spine of the week. Everything else fits around them.',
      },
      {
        title: 'Fill the remaining blocks',
        minutes: '15 min',
        detail:
          'Now fill the rest of the calendar with the work that has to happen — room setup, team planning, curriculum mapping, the compliance items from step 1. Put the collaborative, culture-building work in the mornings when energy is high. Put the solo, logistical work in the afternoons when energy is low. Do not put compliance first thing Monday morning. That tells staff what the week is really about.',
      },
      {
        title: 'Protect the white space',
        minutes: '10 min',
        detail:
          'Leave one block empty. Every day. A 30-minute block with nothing in it. Not "buffer time" that you will fill. Empty. This is the space where the real conversations happen — the ones in the hallway, the ones over coffee, the ones where a teacher tells you they are nervous about the year. If every minute is scheduled, those conversations do not happen. The white space is the culture.',
      },
      {
        title: 'Write the one-line purpose for each day',
        minutes: '5 min',
        detail:
          'Under each day, write one sentence: what is this day for? Not the agenda. The purpose. "Monday: we tell each other who we are." "Tuesday: we build the sentence together." "Wednesday: we make the norms ours." "Thursday: we do the work." "Friday: we get ready and we celebrate." If you cannot write the purpose in one sentence, the day is over-scheduled.',
      },
    ],
    whyItWorks: [
      'The inherited agenda is the enemy of culture. If you use last year\'s agenda, you get last year\'s culture. Designing the week in July, around the sentence and the words, is how you make the first week a launch and not a repeat.',
      'Culture moments go first, logistics go second. The first thing staff experience on Monday morning sets the tone for the entire week. If the first thing is compliance training, the week is about compliance. If the first thing is the leader telling the culture story, the week is about culture. Order is content.',
      'White space is not wasted time. The most important moments of pre-service week happen in the unscheduled gaps — the conversation in the hallway, the question after the session, the lunch where two teachers who have never talked discover they share a worry. A week with no gaps is a week with no culture.',
      'The one-line purpose forces clarity. If you cannot say what a day is for in one sentence, you have scheduled activities, not a day. The purpose sentence is the test. If it does not pass, the day is over-scheduled.',
      'Compliance goes in the low-culture slots. You cannot cut the district mandates. But you can put them where they do the least cultural damage — Friday afternoon, after lunch, the slots where no one is forming a first impression. The slot you put it in says as much as the content itself.',
    ],
    leaderScript:
      '"This week is not about compliance. The compliance pieces are real and we will do them. But they are not what this week is for. This week is for one thing: deciding who we are together. I wrote a sentence this summer about what I want this place to feel like. I picked three words. I am going to tell you that story this morning. Tomorrow, you are going to push on it. Wednesday, we are going to build our norms around it. Thursday and Friday, we get ready for kids. That is the week. The rest is logistics."',
    facilitatorTips: [
      'Do not open pre-service week with logistics. Do not start with the schedule, the parking, the payroll forms. Start with the story. The logistics can wait until after lunch. The story cannot wait, because the story is the first impression.',
      'If a district mandate conflicts with a culture moment, move the culture moment — do not cut it. The compliance time is fixed. Your schedule is not. Find another slot for the culture block. If you cut a culture block to make room for compliance, you have told staff which one matters more.',
      'The leader tells the culture story on Monday. Not the assistant principal. Not the instructional coach. You. The story is yours because the sentence is yours. If you delegate the story, you delegate the culture.',
      'Do not fill the white space. If you see an empty 30-minute block on Thursday and think "I should put something there," do not. The empty block is doing more work than any session you could put in it. Leave it.',
      'Send the agenda to staff before they arrive. Not the full schedule — the one-line purpose for each day. Five sentences. "Monday: we tell each other who we are." This sets the expectation before they walk in the door. Staff who know what the week is for arrive differently than staff who arrive to find out.',
      'On Friday afternoon, end with something good. Not a compliance video. A celebration. A shout-out circle. A toast with bad coffee. The last thing staff experience in pre-service week is the thing they carry into the first day with students. Make it good.',
    ],
  },

  // August — Welcome & Belonging (Weeks 1-5)
  {
    id: 1,
    week: 1,
    title: 'The August Culture Kit',
    category: 'Leader',
    month: 'August',
    monthIndex: 0,
    theme: 'Welcome & Belonging',
    description:
      'Hand every staff member a physical artifact on day one that makes your one-sentence culture visible. A small item, a handwritten card, one sentence per person — placed on every desk before anyone arrives.',
    icon: iconMap['Leader'],
    freePreview: true,
    code: 'CB-04',
    promise: 'Hand every staff member a physical artifact on day one that makes your one-sentence culture visible.',
    timeDisplay: '45–60 min to assemble, 5 min to distribute',
    timeMinutes: 60,
    cost: '$2–$5 per staff member',
    leavesBehind:
      'A tangible, visible reminder of the culture sentence every staff member sees on their desk every day.',
    leaderGoesFirst: true,
    beWord: 'BE Present',
    lane: 'Leader',
    objective:
      'You wrote the sentence in July. Now make it physical. The August Culture Kit is a small, intentional package — one item, one card, one sentence — that lands on every staff member\'s desk before they arrive on the first day of pre-service. It is not a gift bag. It is not swag. It is a signal that the words on the wall are real enough to hold. If the sentence is the compass, the kit is the compass on every desk.',
    supplies: [
      'One small item per staff member that embodies the sentence. Examples: a compass for "find your way," a small notebook for "write the next chapter," a packet of seeds for "grow something," a key for "you belong here."',
      'Index cards or thick cardstock, cut to 3"×5".',
      'A fine-point pen or marker.',
      'The sentence you wrote in CB-01, printed or handwritten on each card.',
      'Optional: a ribbon or twine to tie the item to the card.',
      'A bag or box to carry them in.',
    ],
    steps: [
      {
        title: 'Choose the item',
        minutes: '10 min',
        detail:
          'Go to a store with your sentence in mind. Walk the aisles until you find something small, real, and cheap that embodies it. Not a metaphor — a thing. If your sentence is about belonging, a key. If it is about growth, seeds. If it is about courage, a small compass. Buy one per staff member.',
      },
      {
        title: 'Write the cards',
        minutes: '20 min',
        detail:
          'On each card, write your one-sentence culture statement by hand. Not printed — handwritten. Then add one line below it: a specific reason this person matters to that sentence. "Because you make new students feel brave on their first day." Not a form letter. One sentence per person.',
      },
      {
        title: 'Assemble the kits',
        minutes: '10 min',
        detail:
          'Tie or place the item on each card. Put each one in a small bag or box. Do not seal it — the first thing they see should be the card.',
      },
      {
        title: 'Place them before anyone arrives',
        minutes: '15 min',
        detail:
          'The night before or the morning of pre-service day one, place one kit on every desk, every workroom table, every aide\'s corner. Not in a pile in the lounge. On the desk. Where they sit. Where they will see it before they see you.',
      },
      {
        title: 'Say nothing until someone asks',
        minutes: '5 min',
        detail:
          'When staff arrive, do not announce it. Do not explain it. Let them find it, read it, hold it. When someone asks, say one sentence: "That\'s the sentence I wrote this summer. I wanted you to have it in your hands, not just on the wall."',
      },
    ],
    whyItWorks: [
      'A sentence on a wall is decoration. A sentence in your hand is a promise. The kit moves the culture from the wall to the palm.',
      'Handwriting forces specificity. You cannot handwrite 40 generic cards. The act of writing each person\'s name and one specific reason makes you think about each person as a person, not a roster.',
      'Placing the kits before anyone arrives is the message. It says: I was here first. I thought about where you sit. I did this while the building was empty. That is a different signal than handing something out in a meeting.',
      'The item is a talisman, not a gift. It is not about the cost. It is about having something to hold when the year gets hard that reminds you what you agreed to.',
      'Saying nothing until asked is the most powerful part. An explanation would make it a presentation. Silence makes it a gift.',
    ],
    leaderScript:
      '"I wrote a sentence this summer about what I want this place to feel like. I could have put it on a poster, but I wanted you to hold it. The thing on the card is just a way to make sure it doesn\'t end up in a drawer. Read the card. Keep it where you can see it. If the year gets hard, look at it and ask yourself if we\'re still building what I said we\'d build."',
    facilitatorTips: [
      'Do not let anyone help you write the cards. The handwriting is the point. If your hand cramps, take breaks. If you have 80 staff, this is a two-evening job. That is the right amount of time to spend.',
      'If you cannot find the right item, use a river stone. Write the sentence on the stone with a paint pen. Stones are heavy, permanent, and impossible to throw away. They say: this is real.',
      'Do not photograph the kits for social media. Do not put them in the newsletter. This is between you and the staff. Making it public turns it into a performance.',
      'If a staff member does not pick up their kit, do not chase them with it. Leave it on their desk for a week. If it is still there after a week, move it to their mailbox with a sticky note: "This is yours whenever you\'re ready."',
      'The kit is a one-time act. Do not repeat it in January. The power is in the surprise and the specificity. A second kit would be a tradition, and traditions lose the intimacy.',
    ],
  },
  { id: 53, week: 1, title: 'Warm Staff Welcome', category: 'Staff Culture', month: 'August', monthIndex: 0, theme: 'Welcome & Belonging', description: 'Greet every staff member personally on the first day. Hand-write a welcome note and leave it on their desk before they arrive. Set the tone that this year, everyone is seen and valued from moment one.', icon: iconMap['Staff Culture'] },
  { id: 2, week: 2, title: 'Set Norms Together', category: 'Staff Culture', month: 'August', monthIndex: 0, theme: 'Welcome & Belonging', description: 'Facilitate a collaborative session where the team co-creates meeting norms and shared commitments. When people help build the agreements, they own them.', icon: iconMap['Staff Culture'] },
  { id: 3, week: 3, title: 'First-Week Relationship Activities', category: 'Student Belonging', month: 'August', monthIndex: 0, theme: 'Welcome & Belonging', description: 'Dedicate the first week to getting to know students rather than diving into content. Use icebreakers, interest surveys, and small-group conversations to learn names, stories, and strengths.', icon: iconMap['Student Belonging'] },
  { id: 4, week: 4, title: 'Greet Every Student by Name', category: 'Student Belonging', month: 'August', monthIndex: 0, theme: 'Welcome & Belonging', description: 'Position yourself at the door each morning and greet every student by name. This simple act signals belonging and sets a positive tone for the entire day.', icon: iconMap['Student Belonging'] },
  { id: 5, week: 5, title: 'Welcome Letter & Meet-the-Principal Night', category: 'Family & Community', month: 'August', monthIndex: 0, theme: 'Welcome & Belonging', description: 'Send a personal welcome letter to every family and host a meet-the-principal night. Share your vision, your door-is-open philosophy, and your excitement for the year ahead.', icon: iconMap['Family & Community'] },
  {
    id: 54,
    week: 5,
    title: 'Every Student Claimed',
    category: 'Student Belonging',
    month: 'August',
    monthIndex: 0,
    theme: 'Welcome & Belonging',
    description:
      "Put every student's name on a wall and find out which kids no adult can claim. Then fix it by name — one adult, thirty seconds a day, for thirty days.",
    icon: iconMap['Student Belonging'],
    freePreview: true,
    code: 'CB-53',
    promise: "Put every student's name on a wall and find out which kids no adult can claim.",
    timeDisplay: '25 minutes',
    timeMinutes: 25,
    cost: '$0',
    leavesBehind:
      'A wall grid of every student name with the adults who claim them, and a named adult assigned to every unclaimed student.',
    leaderGoesFirst: true,
    beWord: 'BE Visible',
    lane: 'Staff · Student',
    objective:
      "In the first two weeks of school, get an honest count of how many students in your building are not genuinely known by a single adult, then fix it by name. Most schools assume this problem is small. It is not. This activity makes it visible in one staff meeting and assigns a real person to every kid the wall exposes.",
    supplies: [
      "Every student's name, printed one per label or sticky note. Ask your office to run it from the roster.",
      'A long stretch of wall or butcher paper. It needs to be big enough that the empty spaces are obvious from across the room.',
      'A marker for every adult in the building. Every adult, not just teachers. Custodians, cooks, bus drivers, office staff, paraprofessionals.',
      'Your own claimed list, written before the meeting.',
    ],
    steps: [
      {
        title: 'Go first, and be honest about your number',
        minutes: '5 min',
        detail:
          "Open by naming the students *you* could greet by name and say one true non-academic thing about. Say the number out loud, and say it in front of everyone. If you run a 600-student building and your honest number is 40, say 40. The activity only works if the leader models that a low number is information rather than a failing.",
      },
      {
        title: 'Post every name',
        minutes: '3 min',
        detail:
          'Alphabetical, spread wide. Have a few staff help. Seeing the full roster on a wall is itself the first thing that lands.',
      },
      {
        title: 'Claim',
        minutes: '10 min',
        detail:
          'Every adult walks the wall and marks their initials next to any student they could greet by name *and* name one specific thing about that is not academic. Says the standard out loud before they start: "had them in class" does not count. Knowing they have a little brother, or that they run cross country, or that they hate group work, counts.',
      },
      {
        title: 'Circle the empties',
        minutes: '4 min',
        detail:
          'Circle every name with zero initials. Count them. Read the number to the room and then say nothing for a few seconds. Do not soften it, do not explain it, and do not let anybody explain it either. The silence is the activity.',
      },
      {
        title: 'Assign every one of them',
        minutes: '3 min',
        detail:
          'Each circled name gets one adult who volunteers. The job is thirty seconds of real contact a day for thirty days. Not a mentoring program, not a form, not a check-in log. Thirty seconds, daily, by name.',
      },
    ],
    whyItWorks: [
      'Nearly every leader believes their unclaimed number is smaller than it is. The wall settles the argument with evidence instead of impressions, which is the only way it changes anything.',
      'The kids who go unclaimed are almost never the kids you expect. They are usually quiet, compliant, and mid-range, which is exactly why nobody notices them and exactly why it matters.',
      'Thirty seconds a day is small enough that adults actually do it. Assign a mentoring relationship and half of them quietly lapse by October.',
      "Every adult holding a marker, including the custodian and the bus driver, tells the building who counts as staff. Some of the most-claimed kids in a school are claimed by the person who drives their bus.",
      'Doing it in August means you have the whole year to close the gap. Doing it in February means you found out too late to do much about it.',
    ],
    leaderScript:
      '"Before you do this, here\'s mine. I can name 40 kids in this building by name and tell you one real thing about them that isn\'t a grade. Out of 600. That\'s not good enough and I\'m not going to pretend it is. So we\'re going to put every kid\'s name up there and find out who nobody in this building can claim. Nobody\'s in trouble for what this wall says. We\'re just going to stop guessing."',
    facilitatorTips: [
      'Do not skip your own number, and do not inflate it. Every adult in the room is deciding whether to be honest based on whether you were.',
      'Set the standard before the markers come out, and hold it. If "I had him last year" starts counting, the wall lies to you and the whole exercise is wasted.',
      'Expect the unclaimed count to sting. Let it. The instinct to immediately reassure the room is the instinct that keeps this problem alive.',
      'Photograph the wall before you take it down.',
      'Re-run it in October with the same roster and compare. That is the whole payoff, and it is the reason to keep the photo.',
      'Small schools: it still works, and the number is still higher than you think.',
    ],
  },

  // September — Establishing Identity (Weeks 6-10)
  { id: 6, week: 6, title: 'Staff Shout-Out Board', category: 'Staff Culture', month: 'September', monthIndex: 1, theme: 'Establishing Identity', description: 'Create a visible shout-out board in the staff room where colleagues recognize each other’s contributions. Celebrate the small, everyday acts that make your school work.', icon: iconMap['Staff Culture'] },
  { id: 7, week: 7, title: 'Celebrate Early Wins', category: 'Staff Culture', month: 'September', monthIndex: 1, theme: 'Establishing Identity', description: 'Name and celebrate the wins from the first month — a great lesson, a tough conversation handled well, a new tradition started. Public recognition builds momentum.', icon: iconMap['Staff Culture'] },
  {
    id: 8,
    week: 8,
    title: 'Class Traditions Charter',
    category: 'Leader',
    month: 'September',
    monthIndex: 1,
    theme: 'Establishing Identity',
    description:
      'Co-author a one-page charter of the traditions your school will build this year, so every student knows what they get to be part of. Three to five traditions, signed by students and staff, posted in every classroom.',
    icon: iconMap['Leader'],
    freePreview: true,
    code: 'CB-10',
    promise: 'Co-author a one-page charter of the traditions your school will build this year, so every student knows what they get to be part of.',
    timeDisplay: '60–75 minutes',
    timeMinutes: 75,
    cost: '$0',
    leavesBehind:
      'A one-page Class Traditions Charter, posted in every classroom and signed by the students who built it.',
    leaderGoesFirst: true,
    beWord: 'BE Intentional',
    lane: 'Leader',
    objective:
      'Traditions are not things that happen to students. They are things students help build. The Class Traditions Charter is a one-page document — co-authored by the leader, the staff, and a small group of students — that names the three to five traditions your school will invest in this year. Not a wish list. Not a brainstorm. A charter. A small set of promises about what we do here, how often, and why. The charter makes traditions intentional instead of accidental, and it gives students ownership over the rituals that will define their year.',
    supplies: [
      'One large sheet of chart paper or a whiteboard.',
      'Sticky notes, two colors.',
      'Fine-point markers.',
      'A blank 8.5"×11" page for the final charter.',
      'Optional: examples of traditions from other schools (not to copy — to spark thinking).',
    ],
    steps: [
      {
        title: 'Name what already works',
        minutes: '15 min',
        detail:
          'Ask the group: what is one thing we already do that you would protect? Write each on a sticky note, one per note. Stick them on the board. Do not edit. Do not judge. If someone says "the Friday chant" and someone else says "nothing," both go up.',
      },
      {
        title: 'Find the gaps',
        minutes: '10 min',
        detail:
          'Ask: what is missing? What do students at other schools get that we do not have? Write each on a different color sticky note. Stick them below the first set. This is where you hear the real longing — the assembly they wish existed, the tradition they saw at a sibling\'s school, the thing they think would make this place feel different.',
      },
      {
        title: 'Sort and cut',
        minutes: '15 min',
        detail:
          'Now the hard part. You cannot do all of them. Group the sticky notes into clusters. Then ask one question: which three to five can we actually commit to doing well this year? Not seven. Not ten. Three to five. Move the rest to a "maybe next year" column. The cutting is the work. A charter with twelve traditions is a wish list. A charter with four is a promise.',
      },
      {
        title: 'Write the charter',
        minutes: '15 min',
        detail:
          'On the blank page, write each tradition as a single sentence in this form: "Every Friday, we ______." "At the end of every month, we ______." "When someone new joins our school, we ______." Present tense. Specific. No "try to" or "aim to." Add one line under each: why it matters, in a student\'s words. Not your words. Theirs.',
      },
      {
        title: 'Sign it and post it',
        minutes: '10 min',
        detail:
          'Every person in the room signs the bottom. Then make copies. One for every classroom. One for the front office. One for the website. The signatures are the contract. The posting is the accountability.',
      },
    ],
    whyItWorks: [
      'Traditions that are handed down from the office feel like rules. Traditions that are co-authored feel like promises. The charter moves the authority from the principal\'s office to the students\' hands.',
      'Three to five is the right number. A school can sustain four traditions well. A school that tries to sustain twelve will drop half of them by November, and the dropping will erode trust in the charter itself.',
      'Writing traditions in the present tense ("Every Friday, we celebrate") instead of the future tense ("We will celebrate") makes them real the moment the charter is signed. It says: this is already who we are.',
      'The "maybe next year" column is not a rejection. It is a promise to revisit. It tells students their ideas were heard, not buried. Bring it back in January.',
      'Signing the charter is the most important step. A charter that is posted but not signed is a poster. A charter that is signed is a contract. The signatures are what make it survive October.',
    ],
    leaderScript:
      '"This is not my document. Four students and two teachers wrote it with me in a room last week. These are the traditions we are committing to this year. I am not asking you to add them to your plate. I am asking you to protect them. If we say we do the Friday chant every week, we do it every week. If we say we welcome new students with a buddy and a tour, we do it. The charter is on the wall in every classroom. If we skip one, a student will notice before you do."',
    facilitatorTips: [
      'Do not write the charter yourself and bring it finished. The co-authoring is the point. If you bring a completed charter, students will read it as your plan with their names on it.',
      'Choose the student co-authors carefully. Not the student council president and the honor roll students. Choose students who would not normally be in the room — the quiet one, the new one, the one who got in trouble last year. Their voices will produce traditions the others would not think of.',
      'If a staff member pushes back on a tradition, do not override them. Ask: "What would make this workable for you?" Adjust the tradition, not the person. A charter that a teacher resents will die in their classroom.',
      'Post the charter at student eye level, not adult eye level. If it is above the whiteboard, students will not read it. Tape it to the door, the wall by the pencil sharpener, the corner of the bulletin board. Somewhere they stand.',
      'In January, bring the "maybe next year" column back out. Ask the group: which of these are we ready to add? The charter should grow, but slowly. Adding one tradition in January is a sign of health. Adding five is a sign that the first four were not real.',
    ],
  },
  { id: 9, week: 9, title: 'Student Leadership Roles', category: 'Student Belonging', month: 'September', monthIndex: 1, theme: 'Establishing Identity', description: 'Define and fill visible student leadership roles — ambassadors, mentors, council members. Give students real responsibilities and a voice in how the school runs.', icon: iconMap['Student Belonging'] },
  { id: 10, week: 10, title: 'Back-to-School Night & Family Survey', category: 'Family & Community', month: 'September', monthIndex: 1, theme: 'Establishing Identity', description: 'Host a back-to-school night that feels like a celebration, not a presentation. Send a family survey to learn what they hope for, what they worry about, and how they want to be involved.', icon: iconMap['Family & Community'] },
  {
    id: 11,
    week: 11,
    title: 'The 10-Minute Rounds',
    category: 'Leader',
    month: 'September',
    monthIndex: 1,
    theme: 'Establishing Identity',
    description:
      'Ten minutes a day in classrooms, nothing evaluative, and a note left behind every time. Build one daily habit that gets you into classrooms for reasons that have nothing to do with evaluation.',
    icon: iconMap['Leader'],
    freePreview: true,
    code: 'CB-11',
    promise: 'Ten minutes a day in classrooms, nothing evaluative, and a note left behind every time.',
    timeDisplay: '10 minutes a day',
    timeMinutes: 10,
    cost: '$0',
    leavesBehind:
      'A handwritten note left in every classroom visited, and a one-page tracker showing who has been seen.',
    leaderGoesFirst: true,
    beWord: 'BE Consistent',
    lane: 'Leader',
    objective:
      'Build one daily habit that gets you into classrooms for reasons that have nothing to do with evaluation, and make it visible enough that staff can count on it. Ten minutes, three or four rooms, one specific handwritten note left in each. The goal is not feedback and it is definitely not a walkthrough form. It is presence, delivered on a schedule, until your staff stops flinching when your shadow crosses the door.',
    supplies: [
      'A stack of notecards or sticky notes you keep in your pocket. Not your phone.',
      'A one-page tracker: every teacher\'s name in a grid, one column per week. Paper on a clipboard beats a spreadsheet, because you will actually carry it.',
      'A time on your calendar, recurring, with a name on it. "Rounds" at 9:40 every day. Treat it like a meeting with a person, because it is.',
    ],
    steps: [
      {
        title: 'Block the time and tell people',
        minutes: '5 min of setup',
        detail:
          'Pick a ten-minute window that repeats daily. Announce it to staff: what it is, what it is not, and that it will never appear in an evaluation. Say the "not" part out loud. Every teacher\'s default assumption is that you are collecting evidence.',
      },
      {
        title: 'Walk three or four rooms',
        minutes: '7 min',
        detail:
          'In and out. Do not sit down, do not open a laptop, do not pull up a rubric. Watch for one specific thing worth naming: a question a teacher asked, a kid who was into it, how a transition ran, a wall that changed.',
      },
      {
        title: 'Leave the note before you leave the room',
        minutes: '3 min',
        detail:
          'One sentence, specific, on the desk or the doorframe. "The way you waited after that question instead of filling the silence, that\'s the whole job." Generic praise is worse than none, because it proves you were not really watching.',
      },
      {
        title: 'Mark the tracker',
        minutes: '30 seconds',
        detail:
          'Tick the name. The tracker\'s only job is to catch the teachers you unconsciously skip, and there are always some. The rooms furthest from your office and the teachers who never ask you for anything.',
      },
      {
        title: 'Close the loop weekly',
        minutes: '2 min, Fridays',
        detail:
          'Look at the grid. Anyone with an empty week goes first on Monday. Anyone with three empty weeks gets a real conversation, not another drive-by.',
      },
    ],
    whyItWorks: [
      'Consistency is what makes presence read as culture instead of surveillance. A leader who shows up once in October is inspecting. A leader who shows up every day is just around.',
      'Specific beats frequent, and specific plus frequent beats everything. The note is the proof you were actually looking, and teachers keep them. Check a few desks in May and see.',
      'Separating presence from evaluation is the entire trick. Once your staff believes the rounds are not evidence, the evaluation visits get easier too, because you are no longer a stranger with a clipboard.',
      'The tracker surfaces your blind spots. Nearly every leader systematically under-visits the same handful of rooms, and those teachers absolutely know it.',
      'Ten minutes survives a bad week. Thirty does not, and the habit you drop in November is the one staff remembers.',
    ],
    leaderScript:
      '"Starting Monday I\'m in classrooms for ten minutes every day at 9:40. This is not evaluation. Nothing I see on rounds goes in a document, ends up in your summative, or gets brought up in a meeting. I\'ll leave a note when I see something worth naming. If I\'ve been in your room three times and you\'d rather I knocked first, tell me and I\'ll knock. I just need to stop being a person you only see when something\'s wrong."',
    facilitatorTips: [
      'Do not carry a device. A leader holding a phone in a classroom is typing about somebody, as far as every adult in that room is concerned.',
      'Ten minutes means ten. Ending early when nothing is wrong is what proves it is not an inspection.',
      'If you genuinely see something that needs addressing, address it separately, later, and never through a note left on rounds. Contaminate this once and it is done.',
      'Assistant principals and instructional coaches can run their own rounds, but do not divide the building and call it covered. Staff are tracking whether *you* come.',
      'Hardest part is the first three weeks. Until then, every visit still reads as evaluation. Push through it.',
      'January, Week 3 ("Stay Conversations") lands far better if you have been doing this since September.',
    ],
  },

  // October — Connection & Recognition (Weeks 12-15)
  { id: 12, week: 12, title: 'Appreciation Treats', category: 'Staff Culture', month: 'October', monthIndex: 2, theme: 'Connection & Recognition', description: 'Surprise the staff lounge with coffee, treats, or a catered lunch. Food goes further than you think — it says "I see how hard you’re working" without a single word.', icon: iconMap['Staff Culture'] },
  { id: 13, week: 13, title: 'Spirit Week', category: 'Student Belonging', month: 'October', monthIndex: 2, theme: 'Connection & Recognition', description: 'Organize a full spirit week with themed dress-up days, lunchtime activities, and class competitions. Let student leaders plan and run it — their ownership multiplies the energy.', icon: iconMap['Student Belonging'] },
  { id: 14, week: 14, title: 'Anti-Bullying & Kindness Focus', category: 'Student Belonging', month: 'October', monthIndex: 2, theme: 'Connection & Recognition', description: 'Launch a school-wide kindness campaign tied to anti-bullying awareness. Use the BE words as the anchor: be kind, be visible, be the one to make a difference.', icon: iconMap['Student Belonging'] },
  { id: 15, week: 15, title: 'Fall Conferences & Volunteer Sign-Ups', category: 'Family & Community', month: 'October', monthIndex: 2, theme: 'Connection & Recognition', description: 'Make fall conferences a conversation, not a report card. Ask families what they see in their child. Set up volunteer sign-ups so families can plug in immediately.', icon: iconMap['Family & Community'] },

  // November — Gratitude (Weeks 16-20)
  { id: 16, week: 16, title: 'Notes of Thanks to Each Staff Member', category: 'Staff Culture', month: 'November', monthIndex: 3, theme: 'Gratitude', description: 'Write a handwritten note of specific appreciation to every staff member. This is the single highest-ROI culture move. Be specific — name what they did and why it mattered.', icon: iconMap['Staff Culture'] },
  { id: 17, week: 17, title: 'Start Meetings with Celebrations', category: 'Staff Culture', month: 'November', monthIndex: 3, theme: 'Gratitude', description: 'Open every staff meeting with genuine celebrations. Give people a chance to name something good before diving into the work. It shifts the room.', icon: iconMap['Staff Culture'] },
  { id: 18, week: 18, title: 'Gratitude Wall', category: 'Student Belonging', month: 'November', monthIndex: 3, theme: 'Gratitude', description: 'Create a gratitude wall in the commons where students post notes of thanks to peers, teachers, and staff. Watch it fill up. Read some aloud in announcements.', icon: iconMap['Student Belonging'] },
  { id: 19, week: 19, title: 'Community Service Project', category: 'Student Belonging', month: 'November', monthIndex: 3, theme: 'Gratitude', description: 'Organize a student-led community service project — a food drive, a coat collection, a visit to a senior center. Gratitude grows when it’s practiced, not just talked about.', icon: iconMap['Student Belonging'] },
  { id: 20, week: 20, title: 'Thanksgiving Message & Family Gratitude Event', category: 'Family & Community', month: 'November', monthIndex: 3, theme: 'Gratitude', description: 'Send a heartfelt Thanksgiving message to all families. Host a family gratitude event where families share what they appreciate about the school and each other.', icon: iconMap['Family & Community'] },

  // December — Celebration & Care (Weeks 21-25)
  { id: 21, week: 21, title: 'Staff Winter Scavenger Hunt', category: 'Staff Culture', month: 'December', monthIndex: 4, theme: 'Celebration & Care', description: 'Run the featured Christmas/Winter Scavenger Hunt: snowman, treetop star, gingerbread house, jingle bells. Same rules as fall — 15 minutes, teams of 3+, photograph each find. Laughter guaranteed.', icon: iconMap['Staff Culture'] },
  { id: 22, week: 22, title: 'Cover Duties to Give Breaks', category: 'Staff Culture', month: 'December', monthIndex: 4, theme: 'Celebration & Care', description: 'Personally cover a duty or a class so a teacher can take a break, observe a colleague, or just breathe. The gift of time is the most meaningful gift in December.', icon: iconMap['Staff Culture'] },
  { id: 23, week: 23, title: 'Winter Celebrations Honoring All Cultures', category: 'Student Belonging', month: 'December', monthIndex: 4, theme: 'Celebration & Care', description: 'Host winter celebrations that honor the diverse cultures in your building. Let students and families share their traditions. Make sure every child sees their story reflected.', icon: iconMap['Student Belonging'] },
  { id: 24, week: 24, title: 'Holiday Outreach for Families in Need', category: 'Family & Community', month: 'December', monthIndex: 4, theme: 'Celebration & Care', description: 'Coordinate discreet, dignified support for families in need — gift cards, meals, winter gear. Partner with community organizations. Make sure no family is left behind.', icon: iconMap['Family & Community'] },
  { id: 25, week: 25, title: 'Kill a Task Instead of Adding One', category: 'Staff Culture', month: 'December', monthIndex: 4, theme: 'Celebration & Care', description: 'Identify one unnecessary task, meeting, or report and eliminate it. The best December gift you can give staff is the removal of work, not the addition of a party.', icon: iconMap['Staff Culture'] },

  // January — Fresh Start & Goals (Weeks 26-30)
  { id: 26, week: 26, title: 'Re-Center on Vision', category: 'Staff Culture', month: 'January', monthIndex: 5, theme: 'Fresh Start & Goals', description: 'Bring the team back together to re-center on the shared vision. Remind everyone why this work matters and what you’re building together. A fresh start needs a shared direction.', icon: iconMap['Staff Culture'] },
  { id: 27, week: 27, title: 'Mid-Year Staff Check-Ins', category: 'Staff Culture', month: 'January', monthIndex: 5, theme: 'Fresh Start & Goals', description: 'Hold individual mid-year check-ins with each staff member. Ask: What’s going well? What’s draining you? What do you need from me? Listen more than you talk.', icon: iconMap['Staff Culture'] },
  { id: 28, week: 28, title: 'Goal-Setting with Students', category: 'Student Belonging', month: 'January', monthIndex: 5, theme: 'Fresh Start & Goals', description: 'Guide students through a goal-setting process for the second half of the year. Help them name one academic goal and one personal-character goal. Check in on them monthly.', icon: iconMap['Student Belonging'] },
  { id: 29, week: 29, title: 'Launch New Clubs', category: 'Student Belonging', month: 'January', monthIndex: 5, theme: 'Fresh Start & Goals', description: 'Start a new club or activity based on student interest surveys. New opportunities in January re-engage students who may have disconnected during the fall.', icon: iconMap['Student Belonging'] },
  { id: 30, week: 30, title: 'New-Year Message & Progress Updates', category: 'Family & Community', month: 'January', monthIndex: 5, theme: 'Fresh Start & Goals', description: 'Send a new-year message to families with a summary of progress so far and what’s ahead. Be honest about challenges and celebratory about growth. Families want to be in the loop.', icon: iconMap['Family & Community'] },

  // February — Kindness & Belonging (Weeks 31-35)
  { id: 31, week: 31, title: 'Secret-Buddy Staff Kindness Week', category: 'Staff Culture', month: 'February', monthIndex: 6, theme: 'Kindness & Belonging', description: 'Assign each staff member a secret buddy for the week. Each day, they do something small and kind — a note, a treat, a coffee — and reveal themselves on Friday. Joy multiplies.', icon: iconMap['Staff Culture'] },
  { id: 32, week: 32, title: 'Protect Staff from Unnecessary Work', category: 'Staff Culture', month: 'February', monthIndex: 6, theme: 'Kindness & Belonging', description: 'Audit your own requests. Before you ask the team for something, ask yourself: is this necessary? Kindness sometimes looks like silence — not adding one more thing to their plate.', icon: iconMap['Staff Culture'] },
  { id: 33, week: 33, title: 'Kindness Challenges', category: 'Student Belonging', month: 'February', monthIndex: 6, theme: 'Kindness & Belonging', description: 'Launch daily kindness challenges for students — hold a door, invite someone new to sit with you, write a thank-you note. Track participation and celebrate the ripple effects.', icon: iconMap['Student Belonging'] },
  { id: 34, week: 34, title: 'Inclusion Activities', category: 'Student Belonging', month: 'February', monthIndex: 6, theme: 'Kindness & Belonging', description: 'Run structured inclusion activities that mix students across friend groups, grades, and backgrounds. Belonging is built when students connect with people they wouldn’t naturally seek out.', icon: iconMap['Student Belonging'] },
  { id: 35, week: 35, title: 'Family Literacy or Math Night', category: 'Family & Community', month: 'February', monthIndex: 6, theme: 'Kindness & Belonging', description: 'Host a family literacy or math night that’s interactive, not observational. Families and students learn together, side by side. Make it fun, low-pressure, and welcoming.', icon: iconMap['Family & Community'] },

  // March — Perseverance (Weeks 36-40)
  { id: 36, week: 36, title: 'Encourage Staff Through the Testing Stretch', category: 'Staff Culture', month: 'March', monthIndex: 7, theme: 'Perseverance', description: 'Acknowledge the pressure of testing season openly. Write notes, bring treats, cover duties, and remind the team that test scores don’t define their worth or their students.', icon: iconMap['Staff Culture'] },
  { id: 37, week: 37, title: 'Staff Wellness Focus', category: 'Staff Culture', month: 'March', monthIndex: 7, theme: 'Perseverance', description: 'Designate a wellness week for staff — stretch breaks, healthy snacks, a walking challenge, a no-meeting day. Model that well-being matters and burnout is not a badge of honor.', icon: iconMap['Staff Culture'] },
  { id: 38, week: 38, title: 'Growth-Mindset Campaign', category: 'Student Belonging', month: 'March', monthIndex: 7, theme: 'Perseverance', description: 'Launch a school-wide growth-mindset campaign. Teach students about brain plasticity, the power of "yet," and how struggle is where learning happens. Celebrate effort over outcomes.', icon: iconMap['Student Belonging'] },
  { id: 39, week: 39, title: 'Celebrate Effort, Not Just Achievement', category: 'Student Belonging', month: 'March', monthIndex: 7, theme: 'Perseverance', description: 'Create a visible system for recognizing effort — a "perseverance board," shout-outs in announcements, or certificates. Make sure the recognition reaches students who rarely get it.', icon: iconMap['Student Belonging'] },
  { id: 40, week: 40, title: 'Spring Conferences & Testing Communication', category: 'Family & Community', month: 'March', monthIndex: 7, theme: 'Perseverance', description: 'Use spring conferences to share growth, not just grades. Send clear, calm communication about testing — what it is, what it isn’t, and how families can support without stress.', icon: iconMap['Family & Community'] },

  // April — Appreciation (Weeks 41-45)
  { id: 41, week: 41, title: 'Prep for Staff Appreciation', category: 'Staff Culture', month: 'April', monthIndex: 8, theme: 'Appreciation', description: 'Plan Staff Appreciation Week in detail — each day has a theme, a small gesture, and a personal touch. Involve students and families in the planning. Surprise and delight.', icon: iconMap['Staff Culture'] },
  { id: 42, week: 42, title: 'Recognize Quiet Contributors', category: 'Staff Culture', month: 'April', monthIndex: 8, theme: 'Appreciation', description: 'Identify the staff members who do invisible work — the custodian, the front desk, the paraeducator — and make their contributions visible. Public, specific, sincere thanks.', icon: iconMap['Staff Culture'] },
  { id: 43, week: 43, title: 'Student Recognition Assemblies', category: 'Student Belonging', month: 'April', monthIndex: 8, theme: 'Appreciation', description: 'Hold recognition assemblies that celebrate character, growth, and contribution — not just grades and athletics. Make sure every student hears their name called at some point this year.', icon: iconMap['Student Belonging'] },
  { id: 44, week: 44, title: 'Volunteer Appreciation Event', category: 'Family & Community', month: 'April', monthIndex: 8, theme: 'Appreciation', description: 'Host a volunteer appreciation breakfast or tea. Name each volunteer and what they’ve contributed. Make it personal, warm, and genuine — not a form letter.', icon: iconMap['Family & Community'] },
  { id: 45, week: 45, title: 'Community Event', category: 'Family & Community', month: 'April', monthIndex: 8, theme: 'Appreciation', description: 'Host a community-wide event — a carnival, a showcase, a performance — that brings the neighborhood into the building. Make the school a hub people want to gather at.', icon: iconMap['Family & Community'] },

  // May — Celebration & Legacy (Weeks 46-49)
  { id: 46, week: 46, title: 'Staff Appreciation Week', category: 'Staff Culture', month: 'May', monthIndex: 9, theme: 'Celebration & Legacy', description: 'Execute the Staff Appreciation Week you planned in April. Each day, deliver a personal gesture — a note, a treat, a covered duty, a surprise. Make it the best week of the year.', icon: iconMap['Staff Culture'] },
  { id: 47, week: 47, title: 'Year-End Thank-Yous', category: 'Staff Culture', month: 'May', monthIndex: 9, theme: 'Celebration & Legacy', description: 'Write a final thank-you to each staff member. Reflect on something specific they did this year that made a difference. These notes are kept for years.', icon: iconMap['Staff Culture'] },
  { id: 48, week: 48, title: 'Awards & Celebrate Growth', category: 'Student Belonging', month: 'May', monthIndex: 9, theme: 'Celebration & Legacy', description: 'Hold year-end awards that celebrate growth, character, and belonging alongside academic achievement. Every student should leave the year knowing they were seen and valued.', icon: iconMap['Student Belonging'] },
  { id: 49, week: 49, title: 'End-of-Year Celebration & Family Survey', category: 'Family & Community', month: 'May', monthIndex: 9, theme: 'Celebration & Legacy', description: 'Host an end-of-year celebration for families. Send a feedback survey asking what worked, what didn’t, and what they hope for next year. Close the loop by sharing what you heard.', icon: iconMap['Family & Community'] },

  // June — Reflection & Closure (Weeks 50-52)
  { id: 50, week: 50, title: 'Reflect Together as a Staff', category: 'Staff Culture', month: 'June', monthIndex: 10, theme: 'Reflection & Closure', description: 'Bring the team together for a structured year-end reflection. What worked? What didn’t? What do we carry forward? Capture it in writing so next year’s team can build on it.', icon: iconMap['Staff Culture'] },
  { id: 51, week: 51, title: 'Honor Departures & Closing Traditions', category: 'Student Belonging', month: 'June', monthIndex: 10, theme: 'Reflection & Closure', description: 'Honor staff and students who are leaving. Name their contributions publicly. Hold closing traditions that mark the end — a clap-out, a final circle, a farewell walk through the halls.', icon: iconMap['Student Belonging'] },
  { id: 52, week: 52, title: 'Thank-You Message & Summer Connection', category: 'Family & Community', month: 'June', monthIndex: 10, theme: 'Reflection & Closure', description: 'Send a final thank-you message to families. Share summer connection information — reading lists, community resources, office hours. Let them know the door stays open even when school is out.', icon: iconMap['Family & Community'] },
];

export const categoryColors: Record<CultureActivity['category'], { bg: string; text: string; border: string; accent: string }> = {
  'Staff Culture': {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    accent: 'bg-blue-600',
  },
  'Student Belonging': {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    accent: 'bg-indigo-600',
  },
  'Family & Community': {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
    accent: 'bg-teal-600',
  },
  'Leader': {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    accent: 'bg-amber-600',
  },
};
