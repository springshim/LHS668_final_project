(function() {
  var questions = [{
    question: "\n I still enjoy the things I used to do.",
    choices: ['A Little of the Time', 'Some of the Time', 'Good Part of the Time', 'Most of the Time'],
    correctAnswer: [1, 2, 3, 4],
    image: "20.jpeg"
  }];



  var questionCounter = 0;
  var selections = [];
  var quiz = $('#quiz');


  displayNext();


  $('#next').on('click', function (e) {
    e.preventDefault();


    if(quiz.is(':animated')) {
      return false;
    }
    choose();


    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });


  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });


  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });


  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });



  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ' (of 20)' + ':</h2>', {id: 'question_header'});
    qElement.append(header);

    document.getElementById('myImg').src = questions[index].image;

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }


  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }


  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }


  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }


        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
      }
    });
  }

  function displayScore() {
     var score = $('<p>',{id: 'result'});
     var test = $('<p>',{id: 'description'});

     var numCorrect = 0;
     for (var i = 0; i < selections.length; i++) {
         numCorrect = numCorrect + selections[i] + 1;
     }

     if (numCorrect >= 0 && numCorrect <= 44){
       score.append('Your Score is ' + numCorrect + ' out of 80.');
       score.append(' You may be within Normal Range.');
       test.append("Your responses indicate you may not have depression. This screening is not meant to replace a diagnosis from a trained professional. If you are having thoughts of harming yourself or someone else, please call 911 or the National Suicide Prevention Hotline 1-800-237-TALK or 1-800-237-8255");
       document.getElementById('myImg').src = "";
     }
     else if (numCorrect >= 45 && numCorrect <= 59){
       score.append('Your Score is ' + numCorrect + ' out of 80.');
       score.append(' You may be Midly Depressed.');
       test.append("Your responses indicate that you may have mild depression. Even though your symptoms may not impact your life significantly, it’s important to keep an eye on them because they can progress to become more severe over time if left untreated.");       
       test.append("This screening is not meant to replace a diagnosis from a trained professional. If you are having thoughts of harming yourself or someone else, please call 911 or the National Suicide Prevention Hotline 1-800-237-TALK or 1-800-237-8255");
       document.getElementById('myImg').src = "";
     }
     else if (numCorrect >= 60 && numCorrect <= 69){
       score.append('Your Score is ' + numCorrect + ' out of 80.');
       score.append(' You may be Moderately Depressed.');
       test.append("Your responses indicate that you may have moderate depression. Moderate depression can sometimes be severe enough to cause problems at home and work and in social situations. Be sure to talk to your doctor about the symptoms you’re experiencing. Medications, such as sertraline (Zoloft) or venlafaxine (Effexor) may be prescribed to you. These can take up to 6 weeks to start taking effect. Your doctor may also recommend  cognitive behavioral therapy. This screening is not meant to replace a diagnosis from a trained professional. If you are having thoughts of harming yourself or someone else, please call 911 or the National Suicide Prevention Hotline 1-800-237-TALK or 1-800-237-8255");
       document.getElementById('myImg').src = "";
     }
     else if (numCorrect >= 70 && numCorrect <= 80){
       score.append('Your Score is ' + numCorrect + ' out of 80.');
       score.append(' You may be Severly Depressed.');
       test.append("Your responses indicate that you may have severe depression. Episodes of severe depression last an average of 6 months or longer. You should schedule an appointment with your doctor. They will likely recommend medication and a form of talk therapy. This screening is not meant to replace a diagnosis from a trained professional. If you are having thoughts of harming yourself or someone else, please call 911 or the National Suicide Prevention Hotline 1-800-237-TALK or 1-800-237-8255");
       document.getElementById('myImg').src = "";
     }
     return [score, test];
  }




})();
