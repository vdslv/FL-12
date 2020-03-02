// $("#someId").css({"prop" : "value", "prop1" : "value1", ...});

//body: add padding 20px
$('body').css({padding: 20});
// id title: make align center, remove top margin
$('#title').css({marginTop: 0, textAlign: 'center'});
// div after header: add double border and padding 20px
$('header + div').css({border: '3px double blue', padding: 20});
// change color for all h2 and set top margin to 0
$('h2').css({color: 'red', marginTop: 0});
// set font size 18px for all .list direct child
$('.list > li').css({fontSize: 18});


// ******************************************************
// :even, :odd, :first, :last, :not(), :empty
// :gt() /* all elements at an index greater then specified */
// :lt() /* all elements at an index less then specified */
// :hidden /* display: none, type="hidden", width & height = 0, ancestor is hidden */
// :visible /* are visible */
// :parent /* are parents to other elements, including text node */
// :contains() /* contain the specified text */
// :has() /* contain at least one element that matches the specified selector */
// ******************************************************

// in #list-1
// show all hidden and not cloned li
$('#list-1').find(':hidden').not('.cloned').show();
// hide empty li
$('#list-1').find(':empty').hide();
// in #list-3
// for all even li set margin-left -20px
$('#list-3 li:even').css({marginLeft : -20});
// for the first li set any different color
$('#list-3 li:first').css({color: 'orange'});
// for all li with index > 5 set color to #ccc
$('#list-3 li:gt(5)').css({color: '#ccc'});
// show ul which is parent
$('ul:has(*)').css({border: '2px solid green'});
// for li which has 'em' add red color
$('li:has(em)').css({color: 'red'});
// for li which contains text 'Buratino' set font weight to bold
$('li:contains(Buratino)').css({fontWeight: 'bold'});

// ******************************************************
// :first-child, :last-child, :only-child, :first-of-type, :last-of-type,
// :only-of-type, :nth-child(), :nth-last-child(), :nth-last-of-type(),
// :nth-of-type()
// ******************************************************

// for b in p which is the only child set font size 36px
$('p b:only-child').css({fontSize: 36});
// for em in p which is the last child of type set color to green
$('p em:last-of-type').css({color: 'green'});

// ******************************************************
// [name], [name|='value'], [name*='value'], [name~='value'],
// [name$='value'], [name^='value']
// [name!='value'] /* neither such attribute nor specified value */
// ******************************************************

// set width 80px for input with attribute name ended by 'age'
$('[name$="age"]').width(80);
// set width 120px for input with attribute name started by 'my'
$('[name^="my"]').width(120);
// console.log checked checkbox
console.log($(':checked'));
// show all images with a cat
$('img[src*="cat"]').show();

// ******************************************************
// is(), not(), has()
// eq(), first(), last()
// find(), parent(), parents(), closest()
// children(), prev(), next(), siblings()
// ******************************************************
// for .mbox with index 3 set padding-top 50px
$('.mbox').last().css({paddingTop: 50});
// for first div wraper for img set float left and border red
$('img').wrap("<div></div>").first().css({float: 'left', border: '1px solid red'});
