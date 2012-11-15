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
    title: "Opening Paragraph: Thesis",
    question: "In one sentence, tell the reader what your opinion on the subject of [title] is.",
    inputField: "textarea",
    inputName: "thesis"
};

slides[slides.length] = {
    title: "Opening Paragraph: Supporting Sentences",
    question: "Talk about some details that prove your point, aim for 5.",
    numFields: 5,
    inputField: "textarea",
    inputName: "openParaSupporting"
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
        var toAppend = [];
        if (i === 0)
        {
            toAppend = ['<div class="item active">', '<div class="container">', '<div class="carousel-caption">'];
        }
        else
        {
            toAppend = ['<div class="item">', '<div class="container">', '<div class="carousel-caption">'];
        }

        toAppend[toAppend.length] = '<h2>' + slides[i].title + '</h2>';
        toAppend[toAppend.length] = '<p class="lead">' + slides[i].question + '</p>';
        if (slides[i].hasOwnProperty("numFields"))
        {
            for (j = 0; j < slides[i].numFields; ++j)
            {
                toAppend[toAppend.length] = '<br><textarea name="' + slides[i].inputName + j + '" id="' + slides[i].inputName + j + '" type="' + slides[i].inputField + j + '" class="supporting" wrap="soft"></textarea><br>';
            }
        }
        else
        {
            if (slides[i].inputField === "text")
            {
                toAppend[toAppend.length] = '<br><input name="' + slides[i].inputName + '" id="' + slides[i].inputName + '" type="' + slides[i].inputField + '"><br>';
            }
            else if (slides[i].inputField === "textarea")
            {
                toAppend[toAppend.length] = '<br><textarea name="' + slides[i].inputName + '" id="' + slides[i].inputName + '" type="' + slides[i].inputField + '" wrap="soft"></textarea><br>';
            }
        }
        toAppend[toAppend.length] = '<a class="btn btn-large btn-primary" href="#">Submit</a>';
        toAppend[toAppend.length] = '</div>';
        toAppend[toAppend.length] = '</div>';
        toAppend[toAppend.length] = '</div>';
        
        $('.carousel-inner').append(toAppend.join(''));
    }
});