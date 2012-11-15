var slides = [];

slides[slides.length] = {
    title: "Name",
    question: "What is your first and last name?",
    inputField: "text",
    inputName: "userName"
};

slides[slides.length] = {
    title: "Date",
    question: "What is today's date?",
    inputField: "text",
    inputName: "date"
};

slides[slides.length] = {
    title: "Title",
    question: "What is the title of your paper?",
    inputField: "text",
    inputName: "title"
};

slides[slides.length] = {
    title: "Opening Paragraph: Intro",
    question: "In one or two sentences, tell the reader why the subject of [title] is important.",
    inputField: "textarea",
    inputName: "introSentence"
};

slides[slides.length] = {
    title: "Opening Paragraph: Supporting Sentences",
    question: "Talk about some details that prove your point, aim for 5.",
    numFields: 5,
    inputField: "textarea",
    inputName: "openParaSupporting"
};

slides[slides.length] = {
    title: "Opening Paragraph: Thesis",
    question: "In one sentence, tell the reader what your opinion on the subject of [title] is.",
    inputField: "textarea",
    inputName: "thesis"
};

slides[slides.length] = {
    title: "Opening Paragraph: Transition",
    question: "In one sentence, mention your first idea in a different way.",
    inputField: "textarea",
    inputName: "openParaTransition"
};

slides[slides.length] = {
    title: "1st Supportive Paragraph: Intro",
    question: "Say why idea one is important and link it to the transition sentence you just used",
    inputField: "textarea",
    inputName: "firstParaIntro"
};

$(document).ready(function() {
    for (i = 0; i < slides.length; ++i)
    {
        var numFields;
        if (slides[i].hasOwnProperty("numFields"))
        {
            numFields = slides[i].numFields;
        }
        else
        {
            numFields = 1;
        }

        for (j = 0; j < numFields; ++j)
        {
            var slide = [];

            if (i === 0)
            {
                slide = ['<div class="item active">', '<div class="container">', '<div class="carousel-caption">'];
            }
            else
            {
                slide = ['<div class="item">', '<div class="container">', '<div class="carousel-caption">'];
            }

            if (numFields > 1)
            {
                slide[slide.length] = '<h2>' + slides[i].title + ' ' + (j + 1) + '</h2>';
            }
            else
            {
                slide[slide.length] = '<h2>' + slides[i].title + '</h2>';
            }

            slide[slide.length] = '<p class="lead">' + slides[i].question + '</p>';
            
            if (slides[i].inputField === "text")
            {
                slide[slide.length] = '<br><input name="' + (slides[i].inputName + j) + '" id="' + (slides[i].inputName + j) + '" type="' + slides[i].inputField + '"><br>';
            }
            else if (slides[i].inputField === "textarea")
            {
                slide[slide.length] = '<br><textarea name="' + (slides[i].inputName + j) + '" id="' + (slides[i].inputName + j) + '" type="' + slides[i].inputField + '" wrap="soft"></textarea><br>';
            }

            slide[slide.length] = '<a id="' + (slides[i].inputName + j) + 'Submit" class="btn btn-large btn-primary">Submit</a>';
            slide[slide.length] = '</div>';
            slide[slide.length] = '</div>';
            slide[slide.length] = '</div>';
            
            $('.carousel-inner').append(slide.join(''));
            if (i < 3)
            {
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