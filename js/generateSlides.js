/* Essay Elemental
 *
 * Description: A web application to help students learn how to build and write
 *              essays of varying degrees of difficulty. The student is asked a
 *              simple series of questions, breaking down the essay creation
 *              process into small bite-sized pieces that will make it fairly
 *              easy to complete.
 *
 * Setup:       slideContent holds the information that is required to construct
 *              the slides and essay. The required information includes the title
 *              of the question, the question itself, the number of fields required
 *              to answer the question, the type of input field to be used, and the
 *              id/class/identifier for the input type.
 *
 * Dynamic Gen: In order to make the process easier and to follow the DRY mantra,
 *              the essay questions and components are generated dynamically.
 *              For every slide, a new "item" is created in the Bootstrap Carousel
 *              with all the required information. The naming scheme of the elements
 *              are standardized so that linking buttons and textboxes to the essay
 *              components is simplified. Ex: title0Output = essay component,
 *              title0 = input field for the title, title0Submit = button to make
 *              the necessary changes to the page. The integer in the middle
 *              identifies which one we're referring to, incase of multipart questions
 *              like asking for supporting details for paragraphs. In those cases,
 *              the number will be 1-5+.
 */

// Class to hold the content and methods of the slides/spans that will be generated
function slideContent(title, question, numFields, inputField, inputName)
{
    this.title = title;
    this.question = question;
    this.numFields = numFields;
    this.inputField = inputField;
    this.inputName = inputName;

    // Generates the first few divs necessary for the carousel
    this.generateItem = function(index)
    {
        var item = (index === 0) ? "item active" : "item";
        return ['<div class="' + item + '">',
                '<div class="container">',
                '<div class="carousel-caption">'];
    };

    // Generate the title of the slide
    this.generateTitle = function(i, j)
    {
        var generatedTitle = (numFields > 1) ? title + ' ' + (j + 1) : title;
        return '<h2>' + generatedTitle + '</h2>';
    };

    // Generate the question
    this.generateQuestion = function()
    {
        return '<p class="lead">' + question + '</p>';
    };

    // Generate input field
    this.generateInput = function()
    {
        slide[slide.length] = (slidesContent[i].inputField === "text") ?
            '<br><input name="' + uniqueID + '" id="' + uniqueID + '" type="' + slidesContent[i].inputField + '"><br>'
            :
            '<br><textarea name="' + uniqueID + '" id="' + uniqueID + '" type="' + slidesContent[i].inputField + '" wrap="soft"></textarea><br>';

        slide[slide.length] = '<a id="' + uniqueID + 'Submit" class="btn btn-large btn-primary">Submit</a>';
        slide[slide.length] = '</div>';
        slide[slide.length] = '</div>';
        slide[slide.length] = '</div>';
    };
}

// SlideContent.prototype =
// {
//     generateItem: function(index)
//     {
//         var item = (index === 0) ? "item active" : "item";
//         return ['<div class="' + item + '">',
//                 '<div class="container">',
//                 '<div class="carousel-caption">'];
//     },
//     generateTitle: function(i, j)
//     {
//         var generatedTitle = (this.numFields > 1) ? this.title + ' ' + (j + 1) : this.title;
//         return '<h2>' + generatedTitle + '</h2>';
//     },
//     generateQuestion: function()
//     {
//         return '<p class="lead">' + this.question + '</p>';
//     },
//     generateInput: function()
//     {
//         slide[slide.length] = (slidesContent[i].inputField === "text") ?
//             '<br><input name="' + uniqueID + '" id="' + uniqueID + '" type="' + slidesContent[i].inputField + '"><br>'
//             :
//             '<br><textarea name="' + uniqueID + '" id="' + uniqueID + '" type="' + slidesContent[i].inputField + '" wrap="soft"></textarea><br>';

//         slide[slide.length] = '<a id="' + uniqueID + 'Submit" class="btn btn-large btn-primary">Submit</a>';
//         slide[slide.length] = '</div>';
//         slide[slide.length] = '</div>';
//         slide[slide.length] = '</div>';
//     }
// };

// Create the slides here and insert it into the slides array
function readySlides()
{
    var slidesContent = [];

    slidesContent[slidesContent.length] = new slideContent("Name", "What is your first and last name?", 1, "text", "userName");
    slidesContent[slidesContent.length] = new slideContent("Date", "What is today's date?", 1, "text", "date");
    slidesContent[slidesContent.length] = new slideContent("Title", "What is the title of your paper?", 1, "text", "title");
    slidesContent[slidesContent.length] = new slideContent("Opening Paragraph: Intro",
                                                           "In one or two sentences, tell the reader why the subject of <span class=\"title0Output\"></span> is important.",
                                                           1, "textarea", "introSentence");
    slidesContent[slidesContent.length] = new slideContent("Opening Paragraph: Supporting Sentence",
                                                           "Talk about some details that prove your point, aim for 5.",
                                                           5, "textarea", "openParaSupporting");
    slidesContent[slidesContent.length] = new slideContent("Opening Paragraph: Thesis",
                                                           "In one sentence, tell the reader what your opinion on the subject of <span class=\"title0Output\"></span> is.",
                                                           1, "textarea", "thesis");
    slidesContent[slidesContent.length] = new slideContent("Opening Paragraph: Transition",
                                                           "In one sentence mention your <span class=\"openParaSupporting0\" style=\"text-decoration: underline; color: #66d9ef;\">first idea</span> in a different way.",
                                                           1, "textarea", "openParaTransition");
    slidesContent[slidesContent.length] = new slideContent("1st Supportive Paragraph: Intro",
                                                           "Say why idea 1 is important and link it to the transition sentence you just used.",
                                                           1, "textarea", "para1Intro");
    slidesContent[slidesContent.length] = new slideContent("1st Supportive Paragraph: Supporting Sentence",
                                                           "State a fact that supports your claim.",
                                                           5, "textarea", "para1Supporting");
    slidesContent[slidesContent.length] = new slideContent("1st Supportive Paragraph: Recap",
                                                           "Restate your idea.",
                                                           1, "textarea", "para1Recap");
    slidesContent[slidesContent.length] = new slideContent("1st Supportive Paragraph: Transition",
                                                           "In one sentence, mention your first idea in a different way.",
                                                           1, "textarea", "openParaTransition");

    return slidesContent;
}

// Document manipulation
$(document).ready(function()
{
    // Get the slides
    var slidesContent = readySlides();

    // slide locations
    var numSlides = 0;
    var currentSlide = 1;
    var mostDone = 0;

    // Loop through the slides and begin constructing the page
    for (i = 0; i < slidesContent.length; ++i)
    {
        // 1 slide is needed per question, and extra slides are needed for lengthy
        // multipart questions
        var numFields = slidesContent[i].numFields;
        for (j = 0; j < numFields; ++j)
        {
            var slide = [];

            // initialize with initial divs
            slide = slidesContent[i].generateItem(i);

            // determine what the title is based on the numFields
            slide[slide.length] = slidesContent[i].generateTitle(i, j);

            // generate question
            slide[slide.length] = slidesContent[i].generateQuestion();
            
            // this will be the unique name/id for the spans/inputs
            var uniqueID = slidesContent[i].inputName + j;

            // It's either a text or textarea input
            slide[slide.length] = (slidesContent[i].inputField === "text") ?
                '<br><input name="' + uniqueID + '" id="' + uniqueID + '" type="' + slidesContent[i].inputField + '"><br>'
                :
                '<br><textarea name="' + uniqueID + '" id="' + uniqueID + '" type="' + slidesContent[i].inputField + '" wrap="soft"></textarea><br>';

            slide[slide.length] = '<a id="' + uniqueID + 'Submit" class="btn btn-large btn-primary">Submit</a>';
            slide[slide.length] = '</div>';
            slide[slide.length] = '</div>';
            slide[slide.length] = '</div>';

            $('.carousel-inner').append(slide.join(''));

            // Add the spans for essay creation
            // intial 3 elements like name, date, title
            if (i < 3)
            {
                // center the title
                if (slidesContent[i].inputName === "title")
                {
                    $('#essay').append('<br><center><span class="' + uniqueID + 'Output">');
                }
                else
                {
                    $('#essay').append('<br><span class="' + uniqueID + 'Output">');
                }
            }
            else
            {
                $('#essay').append('<span class="' + uniqueID + 'Output">');
            }

            ++numSlides;
        }
    }

    // hide the carousel navigation initially
    $(".right").hide();
    $(".left").hide();
    

    // Submit button
    $(".btn").click(function()
    {
        // grab the textbox value
        var inputName = $(this).attr("id").replace('Submit', '');
        var inputValue = $("#" + inputName).val();

        if (inputValue !== "")
        {
            // the span's name is === button's name only Submit replaced by Output
            var spanName = $(this).attr("id").replace('Submit', 'Output');

            // Clear the span first then put in the value of the textbox
            $("." + spanName).html('');
            $("." + spanName).append(inputValue);
            ++mostDone;

            // Only show it if we're not at the last slide
            if (currentSlide !== numSlides)
            {
                $(".right").show();
            }
        }
        // TODO: display some error message
        else
        {

        }
    });

    // Right carousel button
    $(".right").click(function()
    {
        // Disable the "Next" button after it is pressed, but only if that slide
        // has not been completed yet
        if (currentSlide === mostDone)
        {
            $(this).hide();
        }
        $(".left").show();
        ++currentSlide;
    });

    // Left carousel button
    $(".left").click(function()
    {
        // Show the Next button; moving back to previously filled out slide
        $(".right").show();
        --currentSlide;
        
        // Disable the back button if at the initial slide
        if (currentSlide === 1)
        {
            $(this).hide();
        }
    });

    // TODO: refactor to be generic
    $(".openParaSupporting0").hover(
    function()
    {
        var spanName = $(this).attr("class") + "Output";
        $(this).addClass("highlight-idea");
        $("." + spanName).addClass("highlight-text");
        console.log(spanName);
    },
    function()
    {
        var spanName = $(this).attr("class") + "Output";
        $(this).removeClass("highlight-idea");
        $("." + spanName).removeClass("highlight-text");
        console.log(spanName);
    });

    // keyboard listener to go NEXT when right arrowkey pressed
    $(document).keydown(function(e)
    {
        if (e.keyCode === 39)
        {
            if ($(".right").css("display") !== "none")
            {
                $(".right").trigger('click');
            }
            return false;
        }
    });

    // keyboard listener to go BACK when left arrowkey pressed
    $(document).keydown(function(e)
    {
        if (e.keyCode === 37)
        {
            if ($(".left").css("display") !== "none")
            {
                $(".left").trigger('click');
            }

            return false;
        }
    });
});