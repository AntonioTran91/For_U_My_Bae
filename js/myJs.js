const textConfig = {
  text1: "Xin chào Bông và Hương",
  text2: "Anh có điều nì muốn hỏi 2 bạn bé!",
  text3: "Gửi tặng em một món quà nhỏ, hy vọng tiếp được thêm năng lượng cho nàng",
  text5: "Không thích gì cả :))",
  text6: "Quà gì cũng nhận ạ :))",
  text7: "Bé cho anh chút hint đi ~.~",
  text8: "Gửi cho anh nhé (^.^)",
  text9: "Thích những món quà cute dễ thương như anh ^^",
  text10: "Mời em bé khui blind box (*/ω＼*)",
  text12: "xé giấy - Mở hộp thui",
};

$(document).ready(function () {
  // process bar
  setTimeout(function () {
    firstQuestion();
    $(".spinner").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({
      overflow: "visible",
    });
  }, 600);

  $("#text3").html(textConfig.text3);
  $("#no").html(textConfig.text5);
  $("#yes").html(textConfig.text6);

  function firstQuestion() {
    $(".content").hide();
    Swal.fire({
      title: textConfig.text1,
      text: textConfig.text2,
      imageUrl: "img/cuteCat.jpg",
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("img/iput-bg.jpg")',
      imageAlt: "Custom image",
    }).then(function () {
      $(".content").show(200);
    });
  }
  // switch button position
  function switchButton() {
    var audio = new Audio("sound/duck.mp3");
    audio.play();
    var leftNo = $("#no").css("left");
    var topNO = $("#no").css("top");
    var leftY = $("#yes").css("left");
    var topY = $("#yes").css("top");
    $("#no").css("left", leftY);
    $("#no").css("top", topY);
    $("#yes").css("left", leftNo);
    $("#yes").css("top", topNO);
  }
  // move random button póition
  function moveButton() {
  var audio = new Audio("sound/Swish1.mp3");
  audio.play();

  var button = $("#no");
  var maxX = window.innerWidth - button.outerWidth();
  var maxY = window.innerHeight - button.outerHeight();

  var x = Math.random() * maxX;
  var y = Math.random() * maxY;

  button.css({
    left: x + "px",
    top: y + "px",
  });
  }

  var n = 0;
  $("#no").mousemove(function () {
    if (n < 1) switchButton();
    if (n > 1) moveButton();
    n++;
  });
  $("#no").click(() => {
    if (screen.width >= 900) switchButton();
  });

  // generate text in input
  function textGenerate() {
  var text = textConfig.text9;
  var currentValue = $("#txtReason").val() || "";
  var nextLength = currentValue.length + 1;

  if (nextLength > text.length) {
    $("#txtReason").val("");
    return;
  }

  $("#txtReason").val(text.slice(0, nextLength));
}

  // show popup
  $("#yes").click(function () {
    var audio = new Audio("sound/tick.mp3");
    audio.play();
    Swal.fire({
      title: textConfig.text7,
      // html: true,
      width: 900,
      padding: "3em",
      html: "<input type='text' class='form-control' id='txtReason'  placeholder='Whyyy'>",
      background: '#fff url("img/iput-bg.jpg")',
      backdrop: `
                    rgba(0,0,123,0.4)
                    url("img/giphy2.gif")
                    left top
                    no-repeat
                  `,
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonColor: "#fe8a71",
      cancelButtonColor: "#f6cd61",
      confirmButtonText: textConfig.text8,
    }).then((result) => {
      if (result.value) {
      Swal.fire({
        width: 900,
        confirmButtonText: textConfig.text12,
        background: '#fff url("img/iput-bg.jpg")',
        title: textConfig.text10,
        confirmButtonColor: "#83d0c9",
      }).then( () => {
        window.location = "./iloveu.html";
      });
      }
    });

    $("#txtReason").focus(function () {
      var handleWriteText = setInterval(function () {
        textGenerate();
      }, 10);
      $("#txtReason").blur(function () {
        clearInterval(handleWriteText);
      });
    });
  });
});
