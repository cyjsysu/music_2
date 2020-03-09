export default function deformation(node, cssObj, nextFunc) {
    clearInterval(node.timer);
    //console.log("RR");
    node.timer = setInterval(function () {
        var isEnd = true;
        for (var attr in cssObj) {
            //console.log(attr);

            var targetValue = cssObj[attr];
            var curValue = null;
            if (attr == "opacity")
                curValue = parseInt(parseFloat(getComputedStyle(node)[attr]) * 100);
            else
                curValue = parseInt(getComputedStyle(node)[attr]);

            var speed = (targetValue - curValue) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (attr == "opacity") {
                curValue += speed;
                node.style.opacity = curValue / 100;
                node.style.filter = "alpha(opacity=" + curValue + ")";
                //console.log(getComputedStyle(node)[attr]);
            } else {
                node.style[attr] = curValue + speed + "px";

            }

            if (curValue != targetValue)
                isEnd = false;

        }
        if (isEnd) {
            if (nextFunc)
                nextFunc.call(node);
        }
    }, 30);
}