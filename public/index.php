<?php 
  $root = '/calculator/public';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
  <link rel="stylesheet" href="<?= $root ?>/css/style.css">
</head>
<body>
    <div class="page scroller">
      <div class="calculator">
        <div class="calculator__screen">
          <div class="history" data-history></div>
          <div class="output" data-output>0</div>
        </div>

        <div class="calculator__btns">
          <button data-clear>C</button>
          <button data-sign>±</button>
          <button data-percent="%">%</button>
          <button data-delete>&larr;</button>
          <button data-number="7">7</button>
          <button data-number="8">8</button>
          <button data-number="9">9</button>
          <button data-operator="÷">÷</button>
          <button data-number="4">4</button>
          <button data-number="5">5</button>
          <button data-number="6">6</button>
          <button data-operator="×">×</button>
          <button data-number="1">1</button>
          <button data-number="2">2</button>
          <button data-number="3">3</button>
          <button data-operator="-">-</button>
          <button data-number="0">0</button>
          <button data-number=".">.</button>
          <button data-equal><span>=</span></button>
          <button data-operator="+">+</button>
        </div>
      </div>
    </div>
    <script src="<?= $root ?>/js/script.js"></script>
</body>
</html>