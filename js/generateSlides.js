function slideContent(title, question, numFields, inputField, inputName)
{
    this.title = title;
    this.question = question;
    this.numFields = numFields;
    this.inputField = inputField;
    this.inputName = inputName;
}

var slides = [];

slides[slides.length] = new slideContent("Name", "What is your first and last name?", 1, "text", "userName");
slides[slides.length] = new slideContent("Date", "What is today's date?", 1, "text", "date");
slides[slides.length] = new slideContent("Title", "What is the title of your paper?", 1, "text", "title");
slides[slides.length] = new slideContent("Opening Paragraph: Intro",
                                         "In one or two sentences, tell the reader why the subject of [title] is important.",
                                         1, "textarea", "introSentence");
slides[slides.length] = new slideContent("Opening Paragraph: Supporting Sentence",
                                         "Talk about some details that prove your point, aim for 5.",
                                         5, "textarea", "openParaSupporting");
slides[slides.length] = new slideContent("Opening Paragraph: Thesis",
                                         "In one sentence, tell the reader what your opinion on the subject of [title] is.",
                                         1, "textarea", "thesis");
slides[slides.length] = new slideContent("Opening Paragraph: Transition",
                                         "In one sentence mention your first idea in a different way.",
                                         1, "textarea", "openParaTransition");
slides[slides.length] = new slideContent("1st Supportive Paragraph: Intro",
                                         "Say why idea 1 is important and link it to the transition sentence you just used.",
                                         1, "textarea", "para1Intro");
slides[slides.length] = new slideContent("1st Supportive Paragraph: Supporting Sentence",
                                         "State a fact that supports your claim.",
                                         5, "textarea", "para1Supporting");
slides[slides.length] = new slideContent("1st Supportive Paragraph: Recap",
                                         "Restate your idea.",
                                         1, "textarea", "para1Recap");
slides[slides.length] = new slideContent("1st Supportive Paragraph: Transition",
                                         "In one sentence, mention your first idea in a different way.",
                                         1, "textarea", "openParaTransition");

$(document).ready(function()
{
    for (i = 0; i < slides.length; ++i)
    {
        var numFields = slides[i].numFields;
        for (j = 0; j < numFields; ++j)
        {
            var slide = [];

            // initialize with initial divs
            var item = (i === 0) ? "item active" : "item";
            slide = ['<div class="' + item + '">',
                     '<div class="container">',
                     '<div class="carousel-caption">'];

            // determine what the title is based on the numFields
            var title = (numFields > 1) ? slides[i].title + ' ' + (j + 1) : slides[i].title;
            slide[slide.length] = '<h2>' + title + '</h2>';

            slide[slide.length] = '<p class="lead">' + slides[i].question + '</p>';
            
            // It's either a text or textarea input
            slide[slide.length] = (slides[i].inputField === "text") ?
                '<br><input name="' + (slides[i].inputName + j) + '" id="' + (slides[i].inputName + j) + '" type="' + slides[i].inputField + '"><br>'
                :
                '<br><textarea name="' + (slides[i].inputName + j) + '" id="' + (slides[i].inputName + j) + '" type="' + slides[i].inputField + '" wrap="soft"></textarea><br>';

            slide[slide.length] = '<a id="' + (slides[i].inputName + j) + 'Submit" class="btn btn-large btn-primary">Submit</a>';
            slide[slide.length] = '</div>';
            slide[slide.length] = '</div>';
            slide[slide.length] = '</div>';

            $('.carousel-inner').append(slide.join(''));

            // Add the spans for essay creation
            // intial 3 elements like name, date, title
            if (i < 3)
            {
                // center the title
                if (slides[i].inputName === "title")
                {
                    $('#essay').append('<br><center><span id="' + (slides[i].inputName + j) + 'Output">');
                }
                else
                {
                    $('#essay').append('<br><span id="' + (slides[i].inputName + j) + 'Output">');
                }
            }
            else
            {
                $('#essay').append('<span id="' + (slides[i].inputName + j) + 'Output">');
            }
        }
    }

    $(".btn").click(function () {
        var spanName = $(this).attr("id").replace('Submit', 'Output');
        var inputName = $(this).attr("id").replace('Submit', '');
        // Clear first
        $("#" + spanName).html('');
        $("#" + spanName).append($("#" + inputName).val());
    });
});