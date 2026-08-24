
const COURSE = {
  title: {ar:"هياكل البيانات 1", en:"Data Structures I"},
  code: "CPCS 204",
  intro: {
    ar:"هذا المقرر لا يحتاج حفظًا أعمى. الفكرة أن ترى كيف تتحرك البيانات، ولماذا نختار بنية على أخرى، ثم تجرّب بنفسك قبل أن تنتقل للفصل التالي.",
    en:"This course is not about memorizing definitions. The goal is to see how data moves, understand why one structure fits better than another, and experiment before moving on."
  },
  chapters: [
    {
      id:"arrays", n:1, title:{ar:"المصفوفات والبحث",en:"Arrays & Searching"}, minutes:35,
      summary:{
        ar:"متى تكون المصفوفة ممتازة؟ ومتى يصبح البحث الخطي عبئًا؟ جرّب Linear Search وBinary Search خطوة بخطوة.",
        en:"When are arrays a great choice, and when does linear search become expensive? Try Linear Search and Binary Search step by step."
      },
      sections:[
        {title:{ar:"الفكرة الأساسية",en:"The Core Idea"},html:{
          ar:`<p>المصفوفة مناسبة عندما نريد الوصول لعنصر بسرعة باستخدام الفهرس. العناصر مرتبة في مواقع متجاورة، ولذلك الوصول إلى <b>arr[i]</b> لا يحتاج المرور على العناصر السابقة.</p><div class="callout"><b>الصورة الذهنية:</b> تخيل صف خزائن مرقمة. إذا قلت لك «الخزانة رقم 7» ستذهب إليها مباشرة. هذه هي فكرة الوصول O(1).</div><h3>أين تظهر التكلفة؟</h3><p>الإدخال في بداية المصفوفة أو وسطها قد يجبرنا على تحريك عدد كبير من العناصر. لهذا يكون الوصول سريعًا، بينما الإدخال والحذف في مواقع معينة قد يصلان إلى O(n).</p>`,
          en:`<p>An array is excellent when you need fast access by index. Because elements are stored in indexed positions, accessing <b>arr[i]</b> does not require visiting earlier elements.</p><div class="callout"><b>Mental model:</b> Imagine a row of numbered lockers. If I tell you “locker 7,” you can go straight to it. That is the idea behind O(1) access.</div><h3>Where does the cost appear?</h3><p>Inserting near the beginning or middle may require shifting many elements. That is why access is fast, while some insertions and deletions can take O(n).</p>`
        }},
        {title:{ar:"البحث الخطي",en:"Linear Search"},html:{
          ar:`<p>البحث الخطي لا يفترض أن البيانات مرتبة. يبدأ من أول عنصر ويفحص عنصرًا بعد الآخر حتى يجد المطلوب أو يصل للنهاية.</p><pre class="code">static int linearSearch(int[] a, int target) {
    for (int i = 0; i &lt; a.length; i++) {
        if (a[i] == target) return i;
    }
    return -1;
}</pre>`,
          en:`<p>Linear Search does not require sorted data. It starts at the first element and checks items one by one until it finds the target or reaches the end.</p><pre class="code">static int linearSearch(int[] a, int target) {
    for (int i = 0; i &lt; a.length; i++) {
        if (a[i] == target) return i;
    }
    return -1;
}</pre>`
        }},
        {title:{ar:"البحث الثنائي",en:"Binary Search"},html:{
          ar:`<p>عندما تكون البيانات مرتبة يمكننا التخلص من نصف الاحتمالات في كل مقارنة. لذلك يصبح الزمن O(log n) بدل O(n).</p><div class="callout warn"><b>شرط مهم:</b> Binary Search يحتاج بيانات مرتبة.</div>`,
          en:`<p>When the data is sorted, we can eliminate half of the remaining possibilities after each comparison. That gives O(log n) instead of O(n).</p><div class="callout warn"><b>Important:</b> Binary Search requires sorted data.</div>`
        }}
      ],
      sim:"binary",
      quiz:{
        q:{ar:"لديك مصفوفة مرتبة من مليون عنصر وتبحث عدة مرات. ما الخيار الأنسب غالبًا؟",en:"You have a sorted array with one million elements and you search it many times. What is usually the best choice?"},
        options:{ar:["Linear Search في كل مرة","Binary Search","المرور على نصف العناصر فقط"],en:["Linear Search every time","Binary Search","Scan only half the elements"]},
        answer:1,
        explain:{ar:"بما أن البيانات مرتبة والبحث متكرر، Binary Search يقلص مساحة البحث إلى النصف في كل خطوة.",en:"Because the data is sorted and searches are repeated, Binary Search cuts the search space roughly in half each step."}
      }
    },
    {
      id:"linked", n:2, title:{ar:"القوائم المرتبطة",en:"Linked Lists"}, minutes:40,
      summary:{ar:"نفصل بين مكان العنصر في الذاكرة والعنصر التالي. ابنِ قائمة وأضف واحذف عقدًا بنفسك.",en:"Separate physical memory position from logical order. Build a linked list and add or remove nodes yourself."},
      sections:[
        {title:{ar:"لماذا نحتاجها؟",en:"Why Do We Need Them?"},html:{
          ar:`<p>في المصفوفة، الحجم والترتيب في الذاكرة يفرضان قيودًا. القائمة المرتبطة تستخدم عقدًا، وكل عقدة تحمل قيمة ورابطًا للعقدة التالية.</p><p>العقد لا يلزم أن تكون متجاورة في الذاكرة. ما يهم هو أن كل عقدة تعرف أين توجد العقدة التالية.</p>`,
          en:`<p>Arrays impose constraints through fixed indexed positions. A linked list uses nodes, where each node stores a value and a reference to the next node.</p><p>Nodes do not need to sit next to each other in memory. What matters is that each node knows where the next one is.</p>`
        }},
        {title:{ar:"العقدة Node",en:"The Node"},html:{
          ar:`<pre class="code">class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
    }
}</pre><div class="callout good">الإضافة في البداية بسيطة: أنشئ عقدة جديدة، اجعل next يشير للرأس القديم، ثم اجعل العقدة الجديدة هي head.</div>`,
          en:`<pre class="code">class Node {
    int data;
    Node next;

    Node(int data) {
        this.data = data;
    }
}</pre><div class="callout good">Inserting at the front is simple: create a new node, point its next to the old head, then make the new node the head.</div>`
        }},
        {title:{ar:"متى أستخدمها؟",en:"When Should You Use One?"},html:{
          ar:`<p>تكون مفيدة عندما يتغير عدد العناصر كثيرًا، أو عندما تكون عمليات الإدخال والحذف أهم من الوصول العشوائي السريع. الوصول إلى العنصر رقم 50 يحتاج المرور على ما قبله، لذلك هو O(n).</p>`,
          en:`<p>Linked lists are useful when the number of elements changes often or when insertion and deletion matter more than fast random access. Reaching the 50th node requires following earlier links, so access is O(n).</p>`
        }}
      ],
      sim:"linked",
      quiz:{q:{ar:"لماذا لا نستطيع الوصول مباشرة إلى العقدة رقم 20 في Singly Linked List؟",en:"Why can’t we directly jump to node 20 in a singly linked list?"},
      options:{ar:["لأن الوصول يعتمد على تتبع next من head","لأن Java تمنع ذلك","لأن القائمة لا تخزن أرقامًا"],en:["Because access depends on following next references from head","Because Java prevents it","Because linked lists cannot store numbers"]},
      answer:0,explain:{ar:"القائمة تعتمد على next، لذلك نبدأ من head ونتتبع الروابط حتى نصل للعقدة المطلوبة.",en:"A singly linked list is navigated through next references, so we start at head and follow links until we reach the target node."}}
    },
    {
      id:"recursion", n:3, title:{ar:"الاستدعاء الذاتي",en:"Recursion"}, minutes:35,
      summary:{ar:"شاهد الـ call stack بدل أن يبقى مفهومًا نظريًا، وافهم دور Base Case.",en:"See the call stack instead of treating recursion as a mysterious idea, and understand the role of the base case."},
      sections:[
        {title:{ar:"ما الذي يحدث فعلًا؟",en:"What Actually Happens?"},html:{
          ar:`<p>الدالة recursive تستدعي نفسها لحل نسخة أصغر من المشكلة. كل استدعاء ينتظر نتيجة الاستدعاء التالي، فيتكون لدينا <b>Call Stack</b>.</p><p>المفتاح هو وجود حالة توقف واضحة وأن يتحرك كل استدعاء باتجاهها.</p>`,
          en:`<p>A recursive function calls itself to solve a smaller version of the problem. Each call waits for the next one, creating a <b>call stack</b>.</p><p>The key is having a clear stopping condition and making progress toward it.</p>`
        }},
        {title:{ar:"Factorial مثال واضح",en:"Factorial: A Clear Example"},html:{
          ar:`<pre class="code">static int factorial(int n) {
    if (n &lt;= 1) return 1;
    return n * factorial(n - 1);
}</pre>`,
          en:`<pre class="code">static int factorial(int n) {
    if (n &lt;= 1) return 1;
    return n * factorial(n - 1);
}</pre>`
        }},
        {title:{ar:"أين نخطئ؟",en:"Where Do We Go Wrong?"},html:{
          ar:`<div class="callout warn">إذا لم تصل الدالة إلى Base Case ستستمر الاستدعاءات حتى يحدث StackOverflowError.</div>`,
          en:`<div class="callout warn">If the function never reaches a base case, calls keep piling up until a StackOverflowError occurs.</div>`
        }}
      ],
      sim:"recursion",
      quiz:{q:{ar:"ما وظيفة Base Case؟",en:"What is the purpose of the base case?"},
      options:{ar:["تسريع المعالج","إيقاف الاستدعاء الذاتي في الوقت الصحيح","تحويل الدالة إلى loop"],en:["Make the CPU faster","Stop recursion at the correct point","Turn the function into a loop"]},
      answer:1,explain:{ar:"Base Case هي نقطة التوقف التي يبدأ بعدها فك الاستدعاءات والعودة بالنتائج.",en:"The base case is the stopping point. Once it is reached, recursive calls begin returning their results."}}
    },
    {
      id:"complexity", n:4, title:{ar:"تحليل الخوارزميات",en:"Algorithm Analysis"}, minutes:30,
      summary:{ar:"افهم Big O كنمو، لا كرموز للحفظ.",en:"Understand Big O as growth behavior, not as symbols to memorize."},
      sections:[
        {title:{ar:"ما الذي نقيسه؟",en:"What Are We Measuring?"},html:{
          ar:`<p>Big O لا يعطي زمنًا بالثواني. هو يصف كيف يزداد العمل عندما يكبر حجم الإدخال n.</p><p>مثلًا: 3n² + 10n + 7 تصبح O(n²) لأن n² يسيطر عندما تكبر n.</p>`,
          en:`<p>Big O does not give runtime in seconds. It describes how the amount of work grows as input size n grows.</p><p>For example, 3n² + 10n + 7 becomes O(n²) because n² dominates for large n.</p>`
        }},
        {title:{ar:"ترتيب شائع",en:"A Common Growth Order"},html:{
          ar:`<p><b>O(1)</b> ثم <b>O(log n)</b> ثم <b>O(n)</b> ثم <b>O(n log n)</b> ثم <b>O(n²)</b>.</p>`,
          en:`<p><b>O(1)</b>, then <b>O(log n)</b>, then <b>O(n)</b>, then <b>O(n log n)</b>, then <b>O(n²)</b>.</p>`
        }}
      ],
      sim:"complexity",
      quiz:{q:{ar:"ما Big O لـ loop داخل loop وكل منهما يعمل n مرة؟",en:"What is the Big O of a loop inside another loop when both run n times?"},
      options:{ar:["O(n)","O(log n)","O(n²)"],en:["O(n)","O(log n)","O(n²)"]},answer:2,
      explain:{ar:"عدد العمليات يقارب n × n، لذلك النمو تربيعي.",en:"The work is roughly n × n, so the growth is quadratic."}}
    },
    {
      id:"stackqueue", n:5, title:{ar:"المكدس والطابور",en:"Stack & Queue"}, minutes:40,
      summary:{ar:"جرّب Push/Pop وEnqueue/Dequeue وشاهد الفرق بين LIFO وFIFO.",en:"Try Push/Pop and Enqueue/Dequeue and see the difference between LIFO and FIFO."},
      sections:[
        {title:{ar:"Stack — آخر داخل، أول خارج",en:"Stack — Last In, First Out"},html:{
          ar:`<p>Stack يشبه رزمة صحون. آخر عنصر وضعته في الأعلى هو أول عنصر ستزيله. العمليتان الأساسيتان هما <b>push</b> و<b>pop</b>.</p>`,
          en:`<p>A stack behaves like a stack of plates. The last item placed on top is the first one removed. The two core operations are <b>push</b> and <b>pop</b>.</p>`
        }},
        {title:{ar:"Queue — أول داخل، أول خارج",en:"Queue — First In, First Out"},html:{
          ar:`<p>Queue يشبه الطابور الحقيقي: من دخل أولًا يخرج أولًا. نضيف من الخلف بـ <b>enqueue</b> ونحذف من الأمام بـ <b>dequeue</b>.</p>`,
          en:`<p>A queue behaves like a real line: the first item to enter is the first item to leave. We add with <b>enqueue</b> and remove with <b>dequeue</b>.</p>`
        }}
      ],
      sim:"stackqueue",
      quiz:{q:{ar:"أي بنية تستخدم عادة في BFS؟",en:"Which structure is typically used in BFS?"},
      options:{ar:["Stack","Queue","Heap فقط"],en:["Stack","Queue","Heap only"]},answer:1,
      explain:{ar:"BFS يزور المستوى الأقرب أولًا، لذلك يحتاج Queue.",en:"BFS explores the nearest level first, so it naturally uses a Queue."}}
    },
    {
      id:"trees", n:6, title:{ar:"الأشجار",en:"Trees"}, minutes:45,
      summary:{ar:"ابنِ Binary Search Tree وشاهد كيف تحدد المقارنات مكان كل عقدة.",en:"Build a Binary Search Tree and see how comparisons determine where each node goes."},
      sections:[
        {title:{ar:"الشجرة ليست قائمة",en:"A Tree Is Not a List"},html:{
          ar:`<p>الشجرة تمثل علاقة هرمية. لدينا Root وChildren وLeaves. Height وDepth يصفان موقع العقدة داخل البنية.</p>`,
          en:`<p>A tree represents hierarchical relationships. We have a root, children, and leaves. Height and depth help describe where a node sits in the structure.</p>`
        }},
        {title:{ar:"Binary Search Tree",en:"Binary Search Tree"},html:{
          ar:`<p>في BST، القيم الأصغر تذهب يسار العقدة، والأكبر تذهب يمينها.</p><div class="callout warn">BST غير المتوازنة قد تتحول عمليًا إلى سلسلة ويصل البحث إلى O(n).</div>`,
          en:`<p>In a BST, smaller values go to the left and larger values go to the right.</p><div class="callout warn">An unbalanced BST can behave like a chain, making search degrade to O(n).</div>`
        }},
        {title:{ar:"Traversals",en:"Traversals"},html:{
          ar:`<p><b>Preorder:</b> Root → Left → Right. <b>Inorder:</b> Left → Root → Right. <b>Postorder:</b> Left → Right → Root.</p>`,
          en:`<p><b>Preorder:</b> Root → Left → Right. <b>Inorder:</b> Left → Root → Right. <b>Postorder:</b> Left → Right → Root.</p>`
        }}
      ],
      sim:"tree",
      quiz:{q:{ar:"في BST، أين نضع قيمة أصغر من العقدة الحالية؟",en:"In a BST, where do we place a value smaller than the current node?"},
      options:{ar:["يسار العقدة","يمين العقدة","في أي مكان"],en:["To the left","To the right","Anywhere"]},answer:0,
      explain:{ar:"قاعدة BST الأساسية: smaller → left وlarger → right.",en:"The basic BST rule is smaller → left and larger → right."}}
    },
    {
      id:"sorting", n:7, title:{ar:"خوارزميات الترتيب",en:"Sorting Algorithms"}, minutes:50,
      summary:{ar:"شاهد Bubble وSelection وInsertion وهي تتحرك فعليًا.",en:"Watch Bubble, Selection, and Insertion Sort move values step by step."},
      sections:[
        {title:{ar:"لماذا توجد عدة خوارزميات؟",en:"Why Are There So Many Sorting Algorithms?"},html:{
          ar:`<p>لأن ظروف البيانات تختلف. بعض الخوارزميات بسيطة ومناسبة للتعليم أو المدخلات الصغيرة، وبعضها أفضل للأحجام الكبيرة.</p><p>Bubble وSelection وInsertion غالبًا O(n²)، بينما Merge Sort وQuick Sort يقتربان عادة من O(n log n) في الاستخدام المناسب.</p>`,
          en:`<p>Because data and constraints differ. Some algorithms are simple and useful for learning or small inputs, while others scale better.</p><p>Bubble, Selection, and Insertion Sort are commonly O(n²), while Merge Sort and Quick Sort are generally closer to O(n log n) in suitable cases.</p>`
        }},
        {title:{ar:"لا تحفظ الحركة… راقبها",en:"Don’t Memorize the Motion — Watch It"},html:{
          ar:`<p>استخدم المحاكاة، غيّر القيم، ثم شغّل أكثر من خوارزمية. لاحظ عدد المقارنات والحركات.</p>`,
          en:`<p>Use the visualizer, generate new values, and run more than one algorithm. Pay attention to comparisons and movements.</p>`
        }}
      ],
      sim:"sorting",
      quiz:{q:{ar:"أي تعقيد نتوقعه عادة من Merge Sort؟",en:"What time complexity do we typically expect from Merge Sort?"},
      options:{ar:["O(n²)","O(n log n)","O(1)"],en:["O(n²)","O(n log n)","O(1)"]},answer:1,
      explain:{ar:"Merge Sort يقسم البيانات ثم يدمجها وله O(n log n).",en:"Merge Sort divides the data and merges it back, giving O(n log n)."}}
    },
    {
      id:"heap", n:8, title:{ar:"الهيب",en:"Heap"}, minutes:35,
      summary:{ar:"افهم لماذا Priority Queue لا تحتاج ترتيب كل العناصر بالكامل.",en:"Understand why a priority queue does not need every element to be fully sorted."},
      sections:[
        {title:{ar:"الفكرة",en:"The Idea"},html:{
          ar:`<p>Heap شجرة ثنائية كاملة تُخزن غالبًا داخل Array. في Max Heap يكون الأب أكبر من أبنائه، وفي Min Heap يكون الأب أصغر منهم.</p>`,
          en:`<p>A heap is a complete binary tree, often stored inside an array. In a Max Heap, each parent is at least as large as its children; in a Min Heap, it is at most as large.</p>`
        }},
        {title:{ar:"الفهارس داخل Array",en:"Indices Inside the Array"},html:{
          ar:`<p>للعقدة عند index i: اليسار <b>2i + 1</b>، اليمين <b>2i + 2</b>، والأب <b>floor((i-1)/2)</b>.</p>`,
          en:`<p>For a node at index i: left child = <b>2i + 1</b>, right child = <b>2i + 2</b>, parent = <b>floor((i-1)/2)</b>.</p>`
        }}
      ],
      sim:"heap",
      quiz:{q:{ar:"في Max Heap، أين توجد أكبر قيمة؟",en:"In a Max Heap, where is the largest value?"},
      options:{ar:["في آخر عنصر","في الجذر","في أي leaf"],en:["At the last element","At the root","At any leaf"]},answer:1,
      explain:{ar:"خاصية Max Heap تضمن أن الجذر هو أكبر عنصر.",en:"The Max Heap property guarantees that the root contains the largest value."}}
    },
    {
      id:"graphs", n:9, title:{ar:"الرسوم البيانية",en:"Graphs"}, minutes:45,
      summary:{ar:"شغّل BFS وDFS على نفس الرسم ولاحظ اختلاف ترتيب الزيارة.",en:"Run BFS and DFS on the same graph and compare the visit order."},
      sections:[
        {title:{ar:"Graph باختصار",en:"Graph in a Nutshell"},html:{
          ar:`<p>Graph يتكون من Vertices وEdges. قد تكون الحواف موجهة أو غير موجهة، وقد تحمل أوزانًا.</p>`,
          en:`<p>A graph is made of vertices and edges. Edges may be directed or undirected, and they may also carry weights.</p>`
        }},
        {title:{ar:"BFS vs DFS",en:"BFS vs DFS"},html:{
          ar:`<p>BFS يتوسع مستوى بمستوى ويستخدم Queue. DFS يغوص في المسار ويستخدم Stack أو recursion.</p>`,
          en:`<p>BFS expands level by level and uses a Queue. DFS goes deep along a path and uses a Stack or recursion.</p>`
        }}
      ],
      sim:"graph",
      quiz:{q:{ar:"إذا أردت أقصر عدد من الحواف في Graph غير موزون، ما البداية الطبيعية؟",en:"If you need the shortest number of edges in an unweighted graph, what is the natural starting point?"},
      options:{ar:["BFS","DFS دائمًا","Heap Sort"],en:["BFS","Always DFS","Heap Sort"]},answer:0,
      explain:{ar:"BFS يكتشف العقد حسب عدد الحواف من نقطة البداية.",en:"BFS discovers nodes in increasing distance by number of edges from the start node."}}
    },
    {
      id:"hash", n:10, title:{ar:"جداول التجزئة",en:"Hash Tables"}, minutes:40,
      summary:{ar:"أدخل مفاتيح وشاهد التصادمات وكيف يعالجها Linear Probing.",en:"Insert keys, watch collisions happen, and see how Linear Probing resolves them."},
      sections:[
        {title:{ar:"الهدف",en:"The Goal"},html:{
          ar:`<p>Hash Table يحاول الوصول إلى القيمة بسرعة بتحويل المفتاح إلى index باستخدام Hash Function.</p><p>قد تنتج مفاتيح مختلفة index نفسه. هذه هي Collision.</p>`,
          en:`<p>A hash table aims for fast access by converting a key into an index using a hash function.</p><p>Different keys may map to the same index. That is called a collision.</p>`
        }},
        {title:{ar:"Linear Probing",en:"Linear Probing"},html:{
          ar:`<p>إذا كانت الخانة مشغولة، ننتقل إلى التالية حتى نجد مكانًا فارغًا.</p>`,
          en:`<p>If the target slot is occupied, we move to the next slot until an empty position is found.</p>`
        }}
      ],
      sim:"hash",
      quiz:{q:{ar:"ما معنى Collision في Hash Table؟",en:"What does a collision mean in a Hash Table?"},
      options:{ar:["تكرار نفس المفتاح فقط","مفتاحان أو أكثر يصلان إلى الخانة نفسها","امتلاء الذاكرة بالكامل"],en:["Only duplicate keys","Two or more keys map to the same slot","The entire memory is full"]},answer:1,
      explain:{ar:"Collision تحدث عندما تنتج دالة التجزئة نفس index لمفاتيح مختلفة.",en:"A collision happens when the hash function maps different keys to the same index."}}
    }
  ]
};
