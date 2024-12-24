import { Quirk } from './quirks';

export type Character = {
    acronym: string;
    name: string;
    color: string;
    quote: string;
    quirk: Quirk;
};

export const characters: { [key: string]: Character } = {
    'anonymous/other': {
        'acronym': '??',
        'name': 'anonymous',
        'color': '000000',
        'quote': "some random text for previewing purposes",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'original character': {
        'acronym': '**',
        'name': 'Original Character',
        'color': 'FF00FF',
        'quote': "I am too awesome for hussie to include in the canon",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'trickster': {
        'acronym': '??',
        'name': 'Trickster',
        'color': 'FFAC9F',
        'quote': "Are you serious?",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'doc scratch': {
        'acronym': '',
        'name': 'Doc Scratch',
        'color': 'FFFFFF',
        'quote': "You know you're going to anyway. You won't be able to help yourself.",
        'quirk': {
            'case': 'proper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'calliope': {
        'acronym': 'UU',
        'name': 'uranianUmbra',
        'color': '929292',
        'quote': "i am jUst astonished. not at the gUile of yoUr little ploy, bUt by the fact that yoU actUally seem to think this was a clever rUse.",
        'quirk': {
            'case': 'lower',
            'replacements': [["u", "U"], ["U_", "u_"], ["_U", "_u"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'caliborn': {
        'acronym': 'uu',
        'name': 'undyingUmbrage',
        'color': '323232',
        'quote': "YOu CAN'T. ESCAPE. THE MIIIIIIIIIIILES.",
        'quirk': {
            'case': 'upper',
            'replacements': [['U', 'u']],
            'prefix': '',
            'suffix': ''
        }
    },
    'lord english': {
        'acronym': 'LE',
        'name': 'Lord English',
        'color': '2ED73A',
        'quote': "GIRL, QUIT ALL THIS SCURRYING AROUND. DO YOU BELIEVE YOU CAN ESCAPE ME BEFORE I ARRIVE?",
        'quirk': {
            'case': 'upper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'other (canon)': {
        'acronym': '??',
        'name': 'Other (canon)',
        'color': 'ff83fb',
        'quote': "NEIGH",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'john': {
        'acronym': 'EB',
        'name': 'ectoBiologist',
        'color': '0715CD',
        'quote': "i don't know, maybe! what do i do!",
        'quirk': {
            'case': 'lower',
            'replacements': [[":d", ":D"], [";d", ";D"], ["d:", "D:"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'rose': {
        'acronym': 'TT',
        'name': 'tentacleTherapist',
        'color': 'B536DA',
        'quote': "",
        'quirk': {
            'case': 'proper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'dave': {
        'acronym': 'TG',
        'name': 'turntechGodhead',
        'color': 'E00707',
        'quote': "",
        'quirk': {
            'case': 'lower',
            'replacements': [["'", " "], [":d", ":D"], [";d", ";D"], ["d:", "D:"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'jade': {
        'acronym': 'GG',
        'name': 'gardenGnostic',
        'color': '4AC925',
        'quote': "i am never going to sleep again!",
        'quirk': {
            'case': 'lower',
            'replacements': [["'", " "], [":d", ":D"], [";d", ";D"], ["d:", "D:"], [":b", ":B"], [";b", ";B"]],
            'prefix': '',
            'suffix': ''
        }

    },
    'jane': {
        'acronym': 'GG',
        'name': 'gutsyGumshoe',
        'color': '00D5F2',
        'quote': "If the chats and surplus dinners were truly important, I wouldn't want to interrupt.",
        'quirk': {
            'case': 'proper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'roxy': {
        'acronym': 'TG',
        'name': 'tipsyGnostalgic',
        'color': 'FF6FF2',
        'quote': "it seems 2 me that there is a (MATHS) % chance of you bein a huge tightass",
        'quirk': {
            'case': 'lower',
            'replacements': [["'", " "], [":d", ":D"], [";d", ";D"], ["d:", "D:"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'dirk': {
        'acronym': 'TT',
        'name': 'timaeusTestified',
        'color': 'F2A400',
        'quote': "It's not 4 you jackass, it's fucking nothing. There is no end.",
        'quirk': {
            'case': 'proper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'jake': {
        'acronym': 'GT',
        'name': 'golgothasTerror',
        'color': '1F9400',
        'quote': "Jesus christofer kringlefucker and here i thought i was rugged!",
        'quirk': {
            'case': 'first-caps',
            'replacements': [["'", " "], [":d", ":D"], [";d", ";D"], ["d:", "D:"], [":p", ":P"], [";p", ";P"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'aradia (dead)': {
        'acronym': 'AA',
        'name': 'apocalypseArisen',
        'color': 'A10000',
        'quote': "maybe if i say st0p en0ugh s0mething else will happen instead 0f the thing that d0es",
        'quirk': {
            'case': 'lower',
            'replacements': [['o', '0'], ["'", " "]],
            'prefix': '',
            'suffix': ''
        }
    },
    'aradiasprite': {
        'acronym': 'ARADIASPRITE',
        'name': 'Aradiasprite',
        'color': 'A10000',
        'quote': "ribbit",
        'quirk': {
            'case': 'lower',
            'replacements': [["o", "0"], ["'", " "]],
            'prefix': '',
            'suffix': ''
        }
    },
    'aradiabot': {
        'acronym': 'AA',
        'name': 'apocalypseArisen',
        'color': '000056',
        'quote': "and the best part ab0ut being d00med is y0u 0nly have t0 put up with it until y0u die",
        'quirk': {
            'case': 'lower',
            'replacements': [["o", "0"], ["'", " "]],
            'prefix': '',
            'suffix': ''
        }
    },
    'aradia': {
        'acronym': 'AA',
        'name': 'apocalypseArisen',
        'color': 'A10000',
        'quote': "theres no better time and there are so many corpses here to work with",
        'quirk': {
            'case': 'lower',
            'replacements': [[":d", ":D"], ["d:", "D:"], [";d", ";D"], ["'", " "]],
            'prefix': '',
            'suffix': ''
        }
    },
    'tavros': {
        'acronym': 'AT',
        'name': 'adiosToreador',
        'color': 'A15000',
        'quote': "i THINK i AM PERFECTLY CAPABLE OF MANUFACTURING THESE ALLEGED \"dope\" HUMAN RHYMES",
        'quirk': {
            'case': 'inverted',
            'replacements': [['.', ','], [":O", ":o"], [":d", ":D"], [":p", ":P"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'sollux':{
        'acronym': 'TA',
        'name': 'twinArmageddons',
        'color': 'A1A100',
        'quote': "do me a favor and 2pare me your 2pooky conundrum2 twoniight, youre kiind of pii22iing me off.",
        'quirk': {
            'case': 'lower',
            'replacements': [["/(^|\\s)to(\\W|$)/", "$1two$2"], ["/(^|\\s)TO(\\W|$)/", "$1TWO$2"], ["/(^|\\s)too(\\W|$)/", "$1two$2"], ["/(^|\\s)TOO(\\W|$)/", "$1TWO$2"], ["/(^|\\s)together(\\W|$)/", "$1twogether$2"], ["/(^|\\s)TOGETHER(\\W|$)/", "$1TWOGETHER$2"], ["/(^|\\s)tonight(\\W|$)/", "$1twonight$2"], ["/(^|\\s)TONIGHT(\\W|$)/", "$1TWONIGHT$2"], ["/(^|\\s)today(\\W|$)/", "$1twoday$2"], ["/(^|\\s)TODAY(\\W|$)/", "$1TWODAY$2"], ["/(^|\\s)tomorrow(\\W|$)/", "$1twomorrow$2"], ["/(^|\\s)TOMORROW(\\W|$)/", "$1TWOMORROW$2"], ["/([iI])/", "$1$1"], ["/([sS])/", "2"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'sollux (blind)':{
        'acronym': 'TA',
        'name': 'twinArmageddons',
        'color': 'A1A100',
        'quote': "h0nestly i'm 0k with it th0ugh, i'm fine, i mean, aside fr0m the part ab0ut n0t being able t0 see g0d damn squat.",
        'quirk': {
            'case': 'lower',
            'replacements': [["o", "0"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'karkat':{
        'acronym': 'CG',
        'name': 'carcinoGeneticist',
        'color': '626262',
        'quote': "NO. MORE LIKE TWITCHY EYED PROJECTILE VOMITING IN UTTER DISGUST FRIENDS, WHILE I PERFORATE MY BONE BULGE WITH A CULLING FORK.",
        'quirk': {
            'case': 'upper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'nepeta': {
        'acronym': 'AC',
        'name': 'arsenicCatnip',
        'color': '416600',
        'quote': "but do you think you could purrhaps please spare your computer for just the most fl33ting of moments?",
        'quirk': {
            'case': 'lower',
            'replacements': [['ee', '33'], ["'", " "], [":dd", ":DD"], [";dd", ";DD"], ["dd:", "DD:"], [":pp", ":PP"], [";pp", ";PP"]],
            'prefix': ':33 <',
            'suffix': ''
        }
    },
    'kanaya':{
        'acronym':'GA',
        'name':'grimAuxiliatrix',
        'color':'008141',
        'quote':"So You Are Destined To Edit It No Matter What And What You Submit Will Be What I Once Read Regardless",
        'quirk': {
            'case': 'title',
            'replacements': [["'", " "]],
            'prefix': '',
            'suffix': ''
        }
    },
    'terezi': {
        'acronym': 'GC',
        'name': 'gallowsCalibrator',
        'color': '008282',
        'quote': "JOHN W3 AR3 SO MUCH B3TT3R TH4N YOU IN 3V3RY R3SP3CT 1TS R1D1CULOUS",
        'quirk': {
            'case': 'upper',
            'replacements': [["A", "4"], ["E", "3"], ["I", "1"], ["a", "4"], ["e", "3"], ["i", "1"], ["/(\\w)'(\\w)/", "$1$2"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'vriska': {
        'acronym': 'AG',
        'name': 'arachnidsGrip',
        'color': '005682',
        'quote': "It is 8ight groups of 8ight. I specifically counted them.",
        'quirk': {
            'case': 'proper',
            'replacements': [["B", "8"], ["b", "8"], ["(m)", "♏"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'equius': {
        'acronym': 'CT',
        'name': 'centaursTesticle',
        'color': '000056',
        'quote': "How do you know about my perspiration problem",
        'quirk': {
            'case': 'proper',
            'replacements': [["X", "%"], ["x", "%"], ["loo", "100"], ["Loo", "100"], ["ool", "001"], ["LOO", "100"], ["OOL", "001"], ["strong", "STRONG"], ["Strong", "STRONG"]],
            'prefix': 'D -->',
            'suffix': ''
        }
    },
    'gamzee': {
        'acronym': 'TC',
        'name': 'terminallyCapricious',
        'color': '2B0057',
        'quote': "ThIs sOuNdS AmAzInG, i cAn't sEe hOw i wOuLdN'T Be aLl kIcKiNg tHe wIcKeD ShIt oUt Of sUcH KiNdS Of oPpOrTuNiTiEs",
        'quirk': {
            'case': 'alternating',
            'replacements': [[":O", ":o"], ["O:", "o:"], [";O", ";o"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'gamzee (sober)': {
        'acronym': 'TC',
        'name': 'terminallyCapricious',
        'color': '2B0057',
        'quote': "it rots you. RUSTS YOUR MOTHERFUCKIN THINK PAN.",
        'quirk': {
            'case': 'alt-lines',
            'replacements': [[":O", ":o"], ["O:", "o:"], [";O", ";o"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'eridan': {
        'acronym': 'CA',
        'name': 'caligulasAquarium',
        'color': '6A006A',
        'quote': "wwho are you tryin to convvince wwith this ludicrous poppycock",
        'quirk': {
            'case': 'lower',
            'replacements': [["V", "VV"], ["v", "vv"], ["W", "WW"], ["w", "ww"], [":o", ":O"], [":d", ":D"], ["d:", "D:"], [";d", ";D"], [":p", ":P"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'feferi': {
        'acronym': 'CC',
        'name': 'cuttlefishCuller',
        'color': '77003C',
        'quote': ")(oly mackerel, looks like SOM-EON-E woke up on t)(e wrong side of t)(e absurd )(uman bed!",
        'quirk': {
            'case': 'proper',
            'replacements': [["E", "-E"], ["H", ")("], ["h", ")("]],
            'prefix': '',
            'suffix': ''
        }
    },
    'damara': {
        'acronym': 'DAMARA',
        'name': 'Damara',
        'color': 'A10000',
        'quote': "私が覚えている。 時々私は、そのメモリに自慰行為。",
        'quirk': {
            'case': 'upper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'rufioh': {
        'acronym': 'RUFIOH',
        'name': 'Rufioh',
        'color': 'A15000',
        'quote': "really, 1 thought 1t would be alr1ght, just flapp1ng w1ngs around... 1 could st1ll fly and just hang there l1mp... m1ght have been a dope look!",
        'quirk': {
            'case': 'lower',
            'replacements': [["i", "1"], ["/(^|\\s)ass(\\W|$)/", "$1*ss$2"], ["/(^|\\s)cripple(\\W|$)/", "$1cr*pple$2"], ["damn", "d*mn"], ["/(^|\\s)fuck1ng(\\W|$)/", "$1f***1ng$2"], ["fuck", "f*ck"], ["/(^|\\s)hell(\\W|$)/", "$1h*ll$2"], ["/(^|\\s)mutant(\\W|$)/", "$1m*tant$2"], ["/(^|\\s)sh1t(\\W|$)/", "$1sh*t$2"], ["/[\\s|^|}](:O)/", "$L"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'mituna':{
        'acronym': 'MITUNA',
        'name': 'Mituna',
        'color': 'A1A100',
        'quote': "K17H5 MY CH4GR1N 7UNK3L Y0U 5N4NK 4ZZ CHUM8UCK357",
        'quirk': {
            'case': 'upper',
            'replacements': [["A", "4"], ["B", "8"], ["E", "3"], ["I", "1"], ["O", "0"], ["S", "5"], ["T", "7"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'kankri':{
        'acronym': 'KANKRI',
        'name': 'Kankri',
        'color': 'FF0000',
        'quote': "",
        'quirk': {
            'case': 'proper',
            'replacements': [["B", "6"], ["b", "6"], ["O", "9"], ["o", "9"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'meulin': {
        'acronym': 'MEULIN',
        'name': 'Meulin',
        'color': '416600',
        'quote': "YOU DON'T UNDERSTAND, M33NAH. THE F33LS. THE F333333333LS!!!!!!!!!",
        'quirk': {
            'case': 'upper',
            'replacements': [["EE", "33"]],
            'prefix': '(^･ω･^) <',
            'suffix': ''
        }
    },
    'porrim':{
        'acronym':'PORRIM',
        'name':'Porrim',
        'color':'008141',
        'quote':" No+ o+ne quite prepares yo+u fo+r the fact that o+n the o+ther side o+f death is an infinite echo+ chamber o+f teen drama.",
        'quirk': {
            'case': 'proper',
            'replacements': [["o", "o+"], ["0", "0+"], ["/(^|\\s)[pP]lus(\\W|$)/", "$1+$2"], ["/(^|\\s)PLUS(\\W|$)/", "$1+$2"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'latula': {
        'acronym': 'LATULA',
        'name': 'Latula',
        'color': '008282',
        'quote': "do you 3v3n know how l4m3 of 4 sc3n3 1t 1s b31ng th3 only l3g1t 1n your f4c3 pow3rg4m1ng grl 1n 4 bunch of bubbl3s full of brut4l pos3rz???",
        'quirk': {
            'case': 'lower',
            'replacements': [["A", "4"], ["a", "4"], ["E", "3"], ["e", "3"], ["I", "1"], ["i", "1"], ["'", " "], ["/[\s|^|>]([:;8x]d)/", "$U"], ["/[\s|^|>]([:;8x]o)/", "$U"], ["/[\s|^|>]([:;8x]p)/", "$U"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'aranea': {
        'acronym': 'ARANEA',
        'name': 'Aranea',
        'color': '005682',
        'quote': "You couldn't even wait a few minutes while I retrieved one last guest? I have to come 8ack to THIS????????",
        'quirk': {
            'case': 'proper',
            'replacements': [["B", "8"], ["b", "8"], ["(m)", "♏"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'horuss': {
        'acronym': 'HORUSS',
        'name': 'Horuss',
        'color': '000056',
        'quote': "Why the long face?",
        'quirk': {
            'case': 'proper',
            'replacements': [["X", "%"], ["x", "%"], ["loo", "100"], ["Loo", "100"], ["ool", "001"], ["LOO", "100"], ["OOL", "001"], ["strong", "STRONG"], ["strength", "STRENGTH"], ["Strong", "STRONG"], ["Strength", "STRENGTH"]],
            'prefix': '8=D <',
            'suffix': ''
        }
    },
    'kurloz': {
        'acronym': 'KURLOZ',
        'name': 'Kurloz',
        'color': '2B0057',
        'quote': "",
        'quirk': {
            'case': 'upper',
            'replacements': [[":O", ":o"], ["O:", "o:"], [";O", ";o"]],
            'prefix': 'SIGNS: <',
            'suffix': '>'
        }
    },
    'cronus': {
        'acronym': 'CRONUS',
        'name': 'Cronus',
        'color': '6A006A',
        'quote': "i just sawv you strutting in my direction, vwith all of your impressivwe moxy and confidence, for the first time in, howv long?",
        'quirk': {
            'case': 'lower',
            'replacements': [["'", " "], ["/([^|\\s])v/", "$1w"], ["/([^|\\s])V/", "$1W"], ["/\\bv|w\\b/", "α"], ["/w|v/", "φ"], ["α", "wv"], ["φ", "vw"], ["/\\bV|W\\b/", "Ά"], ["/W|V/", "Á"], ["Ά", "WV"], ["Á", "VW"], ["B", "8"], ["/(\\w)vw([snklt])/", "$1wv$2"], ["/(\\w)VW([SNKLT])/", "$1WV$2"], ["/(\\w)\\.(\\w)/", "$1$2"], ["/[\\s|^]([:;]d)/", "$U"], ["/[\\s|^](d[:;])", "$U"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'meenah': {
        'acronym': 'MEENAH',
        'name': 'Meenah',
        'color': '77003C',
        'quote': "sayin fish puns is obviously kind of this thing i do stupid G-ET WIT)( T)(-E PROGRAM",
        'quirk': {
            'case': 'lower',
            'replacements': [["E", "-E"], ["H", ")("], ["'", " "], ["/[\s|^](3[8x][odp])/", "$U"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'dad': {
        'acronym': 'pipefan413',
        'name': 'Dad',
        'color': '4B4B4B',
        'quote': "YES. THIS WILL BE THE CASE REGARDLESS OF THE HAT'S ORIENTATION.",
        'quirk': {
            'case': 'upper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'nanna': {
        'acronym': 'NANNA',
        'name': 'Nanna',
        'color': '000000',
        'quote': "How I wish I could have delivered this heirloom to you in the flesh. But I am afraid it wasn't in the cards!",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'mom': {
        'acronym': 'MOM',
        'name': 'Mom',
        'color': '000000',
        'quote': "www www www www",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'bro': {
        'acronym': 'BRO',
        'name': 'Bro',
        'color': '000000',
        'quote': "roof. now. bring cal. ",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'grandpa': {
        'acronym': 'GRANDPA',
        'name': 'Grandpa',
        'color': '000000',
        'quote': "Jade, study hard and keep your rifle at the ready. When adventure summons, I know you will rise to the task and take your rightful place among the DAUGHTERS OF ECLECTICA.",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'poppop': {
        'acronym': 'POPPOP',
        'name': 'Poppop',
        'color': '000000',
        'quote': "DEAD.",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'alpha mom': {
        'acronym': 'MOM',
        'name': 'Mom',
        'color': '000000',
        'quote': "Zazzerpan inspected the clue. A single piece of evidence cradled in his coriaceous old man palms.",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'alpha bro': {
        'acronym': 'BRO',
        'name': 'Bro',
        'color': '000000',
        'quote': "the selection has too many PRICES and VALUES",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'grandma': {
        'acronym': 'GRANDMA',
        'name': 'Grandma',
        'color': '000000',
        'quote': "dead.",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'nannasprite': {
        'acronym': 'NANNASPRITE',
        'name': 'Nannasprite',
        'color': '00D5F2',
        'quote': "Hoo hoo hoo! Of course I know what a computer is, John! I was just pulling your leg!",
        'quirk': {
            'case': 'proper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'jaspersprite': {
        'acronym': 'JASPERSPRITE',
        'name': 'Jaspersprite',
        'color': 'F141EF',
        'quote': "Maybe you can win his affection by rubbing your cheek against him thats what i would do.",
        'quirk': {
            'case': 'proper',
            'replacements': [["'", " "]],
            'prefix': '',
            'suffix': ''
        }
    },
    'calsprite': {
        'acronym': 'CALSPRITE',
        'name': 'Calsprite',
        'color': 'F2A400',
        'quote': "HAA HAA HEE HEE HOO HOO",
        'quirk': {
            'case': 'upper',
            'replacements': [["A", "<"], ["B", ">"], ["C", "?"], ["D", "<"], ["E", ">"], ["F", "?"], ["G", "<"], ["H", ">"], ["I", "?"], ["J", "<"], ["K", ">"], ["L", "?"], ["M", "<"], ["N", ">"], ["O", "?"], ["P", "<"], ["Q", ">"], ["R", "?"], ["S", "<"], ["T", ">"], ["U", "?"], ["V", "<"], ["W", ">"], ["X", "?"], ["Y", "<"], ["Z", ">"], ["<", "HAA "], [">", "HEE "], ["?", "HOO "]],
            'prefix': '',
            'suffix': ''
        }
    },
    'davesprite': {
        'acronym': 'DAVESPRITE',
        'name': 'Davesprite',
        'color': 'F2A400',
        'quote': "thats the best fucking question anybody ever asked",
        'quirk': {
            'case': 'lower',
            'replacements': [["'", " "], [":d", ":D"], [";d", ";D"], ["d:", "D:"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'jadesprite': {
        'acronym': 'JADESPRITE',
        'name': 'Jadesprite',
        'color': '1F9400',
        'quote': "yes i figured shenanigans were probably involved",
        'quirk': {
            'case': 'lower',
            'replacements': [["'", " "], [":d", ":D"], [";d", ";D"], ["d:", "D:"], [":b", ":B"], [";b", ";B"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'tavrisprite': {
        'acronym': 'TAVRISPRITE',
        'name': 'Tavrisprite',
        'color': '0715CD',
        'quote': "eEEEEEEEAAAAAAAAUUUUUUUURRRRRRRRUUUUUUUUEEEEEEEEGGGGGGGGHHHHHHHH,,,,,,,,.",
        'quirk': {
            'case': 'normal',
            'replacements': [["b", "8"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'fefetasprite': {
        'acronym': 'FEFETASPRITE',
        'name': 'Fefetasprite',
        'color': 'B536DA',
        'quote': "3833 < 383",
        'quirk': {
            'case': 'proper',
            'replacements': [["E", "-E"], ["ee", "33"], ["H", ")("], ["h", ")("], ["'", " "], ["8dd", "8DD"], ["dd8", "DD8"], ["8pp", "8PP"]],
            'prefix': '3833 <',
            'suffix': ''
        }
    },
    'erisolsprite': {
        'acronym': 'ERISOLSPRITE',
        'name': 'Erisolsprite',
        'color': '4AC925',
        'quote': "wwoww, iit2 cool ii amu2e you, that really giivve2 meaniing to my joke of an exii2tence, ii mean WWOWW, thank2.",
        'quirk': {
            'case': 'lower',
            'replacements': [["I", "II"], ["i", "ii"], ["S", "2"], ["s", "2"], ["V", "VV"], ["v", "vv"], ["W", "WW"], ["w", "ww"], ["/[\s|^]([:;][dop])/", "$U"], ["/[\s|^](d[:;])/", "$U"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'arquiusprite': {
        'acronym': 'ARQUIUSPRITE',
        'name': 'ARquiusprite',
        'color': 'e00707',
        'quote': "Dude, I am ripped. 100k at me fle% these naughty mother f▒▓▒▒▒rs",
        'quirk': {
            'case': 'proper',
            'replacements': [["/[lL][oO][oO]/", "100"], ["/[xX]/", "%"], ["/(\\b[sS][tT][rR][oO][nN][gG]\\w*)/", "$U"], ["/[oO][oO][lL]/", "001"], ["/(\\w)\\.$/", "$1"], ["/^(\\w)/", "$U"], ["/[!|\\?|\\.](\\s\\w)/", "$U"], ["/[\\s|^](i)['|\\W|$]/", "$U"], ["/([sS])hit/", "$1▓▒▒"], ["/([fF])ucking/", "$1▒▓▒▒▒▒"], ["/([fF])ucker/", "$1▒▓▒▒▒"], ["/(^|\\s)([aA])ss(\\W|$)/", "$1$2▒▒$3"], ["/([fF])uck/", "$1▒▒▓"], ["/([bB])itch/", "$1▒▓▒▒"], ["/(^|\\s)([hH])ell(\\W|$)/", "$1$2▒▒▒$3"], ["/([dD])amn/", "$1▒▒▒"]],
            'prefix': '◥▶◀◤ —>',
            'suffix': ''
        }
    },
    'ar/hal': {
        'acronym': 'TT',
        'name': 'Lil Hal',
        'color': 'E00707',
        'quote': "I refuse to believe my statement has left you unconvinced. The very notion is absurd. Now hurry up and kiss me.",
        'quirk': {
            'case': 'proper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'the handmaid': {
        'acronym': '♈',
        'name': 'The Handmaid',
        'color': 'A10000',
        'quote': "skip tØ the end",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'the summoner': {
        'acronym': '♉',
        'name': 'The Summoner',
        'color': 'A15000',
        'quote': "And ne1ther hell, or h1gh water, w1ll stop the f1re of our revolut1on,",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'the psiioniic':{
        'acronym': '♊',
        'name': 'The Ψiioniic',
        'color': 'A1A100',
        'quote': "Tho2e of u2 wiith ψiioniic2 wiill alway2 be iin danger of the fate II wiill face per2onally.",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'the helmsman':{
        'acronym': '♊',
        'name': 'The Helmsman',
        'color': 'A1A100',
        'quote': "84 77 L3 5H 1P C0 ND 35 C3 N5 10 NN .. PL 34 53 .. 1D 3N 71 FY .. 53 LF",
        'quirk': {
            'case': 'upper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'the signless':{
        'acronym': '♋',
        'name': 'The Signless',
        'color': '626262',
        'quote': "I don't begrudge you your power, but know its abuse will be your downfall.",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'the disciple': {
        'acronym': '♌',
        'name': 'The Disciple',
        'color': '416600',
        'quote': "Take h33d, and behold the Righteous Leggings.",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'the dolorosa':{
        'acronym': '♍',
        'name': 'The Dolorosa',
        'color': '008141',
        'quote': "I agree it is not always what is said that matters but how it is said",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'redglare': {
        'acronym': '♎',
        'name': 'Neophyte Redglare',
        'color': '008282',
        'quote': "Oh, 1ts b33n 4 wond3rful d4y for just1c3, wouldnt you s4y? >:]",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'mindfang': {
        'acronym': '♏',
        'name': 'Marquise Spinneret Mindfang',
        'color': '005682',
        'quote': "Less has acceler8ted meeker than I to homicide, and the viol8tion would hold me aghast, again, if his misgivings did not complement his so endearing arsenal of qu8nt flaws. It is impossi8le to stifle this grin even now as I write.",
        'quirk': {
            'case': 'proper',
            'replacements': [["B", "8"], ["b", "8"], ["(m)", "♏"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'darkleer': {
        'acronym': '♐',
        'name': 'E%ecutor Darkleer',
        'color': '000056',
        'quote': "-+-> I STRONGLY suggest you e%tend a closer 100k.",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '-+->',
            'suffix': ''
        }
    },
    'grand highblood': {
        'acronym': '♑',
        'name': 'The Grand Highblood',
        'color': '2B0057',
        'quote': "I've spilt enough motherfuckin blood to know how it comes out, sister.",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'dualscar': {
        'acronym': '♒',
        'name': 'Orphaner Dualscar',
        'color': '6A006A',
        'quote': "vwhatre you evwen lookin at serket this is NONE A YOUR 8USINESS.",
        'quirk': {
            'case': 'normal',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'the condesce': {
        'acronym': '♓',
        'name': 'Her Imperious Condescension',
        'color': '77003C',
        'quote': "this is what i get for lettin all proper dudes run shit instead of nasty clowns",
        'quirk': {
            'case': 'lower',
            'replacements': [["E", "-E"], ["H", ")("], ["'", " "], ["/[\s|^](3[8x][odp])/", "$U"]],
            'prefix': '',
            'suffix': ''
        }
    },
    'spades slick': {
        'acronym': '♠',
        'name': 'Spades Slick',
        'color': '000000',
        'quote': "there, there, you blubbering goddamn pansy.",
        'quirk': {
            'case': 'lower',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'clubs deuce': {
        'acronym': '♣',
        'name': 'Clubs Deuce',
        'color': '000000',
        'quote': "PARDON ME WHILE I CONSULT THE APPROPRIATE PAGES.",
        'quirk': {
            'case': 'upper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'diamonds droog': {
        'acronym': '♦',
        'name': 'Diamonds Droog',
        'color': '000000',
        'quote': "Make her pay.",
        'quirk': {
            'case': 'proper',
            'replacements': [],
            'prefix': '',
            'suffix': ''
        }
    },
    'hearts boxcars': {
        'acronym': '♥',
        'name': 'Hearts Boxcars',
        'color': '000000',
        'quote': "GET UP ON THOSE GODDAM JELLY LEGS OF YERS",
        'quirk': {
            'case': 'upper',
            'replacements': [["'", " "]],
            'prefix': '',
            'suffix': ''
        }
    } 
}