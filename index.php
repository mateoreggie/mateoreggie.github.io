<!DOCTYPE HTML>
<head>
	<meta lang="en">
	<meta charset="utf-8">
	<title>Home</title>
	<link rel="stylesheet" href="style.css">
</head>

<script src="./script.js"></script>

<body>

<div class="sidebar" id="main-sidebar">
<h1>Mateo Reggie<h1>
<h2>illustrator, concept artist</h2>
<h3>
mateo.s.reggie@gmail.com
</h3>
<ul class="navigation">
<li><a href="">> Home</a></li>
<li><a href="./illustrations">Illustrations</a></li>
<li><a href="./concept-art">Concept Art</a></li>
<li><a href="./painting">Other Art</a></li>

</ul>
</div>

<div class="content" id="main-content">

<div class="carousel">
<div class="arrow-right" id="carousel-arrow-right"><div></div></div>
<div class="arrow-left" id="carousel-arrow-left"><div></div></div>

<button id="carousel-bt-left"></button>
<button id="carousel-bt-right"></button>
<div class="carousel-images">

<?php
$images = scandir("./illustrations", 1);
$descriptions = scandir("./illustrations", 1);

function filter_for_images($var){ 
return (str_ends_with($var, ".jpg") | str_ends_with($var, ".png"));}
function filter_for_text($var){ return(str_ends_with($var, ".txt"));}

$images = array_filter($images, "filter_for_images");
$images = array_values($images);
$descriptions = array_filter($descriptions, "filter_for_text");
$descriptions = array_values($descriptions);

$desc = fopen("./illustrations/".$descriptions[0], "r");
$text = fread($desc, filesize("./illustrations/".$descriptions[0]));
//echo "<img id=\"left\" src=\"./illustrations/$images[0]\"></img>";
echo "<img id=\"carousel-img\" src=\"./illustrations/$images[0]\"></img>";
echo "<p class=\"description\" id=\"image-description\">{$text}</p>";
fclose($desc);
//echo "<img id=\"center\" src=\"./illustrations/$images[1]\"></img>";

?>

</div>

</div>
</div>



</body>
</html>