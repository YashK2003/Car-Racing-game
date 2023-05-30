

function generateRandom(min, max) {
    return Math.random() * (Math.abs((max - min))) + min;
}

var temp = [];
var ycoord = [4, 4, 4, -5, -5, -5, 1, -1]
function generatepoints() {

    // set on first line
    temp.push(generateRandom(-8, -3.42));
    temp.push(generateRandom(-3.42, 1.16));
    temp.push(generateRandom(1.16, 5.75));

    // set on second big staight line
    temp.push(generateRandom(-6.42, -2.28));
    temp.push(generateRandom(-2.28, 1.86));
    temp.push(generateRandom(1.86, 6));

    // put in the next straight path
    temp.push(generateRandom(-2, -1));
    temp.push(generateRandom(-1, 2));
    console.log(temp)

    return temp;

}


function fuelcollision(carx, cary) {
    // console.log(carx , cary);
    // console.log(temp);
    for (let i = 0; i < 8; i++) {
        var xf = temp[i];
        var yf = ycoord[i];

        if (i == 6) {
            xf = -10.6
            yf = temp[i];
        }

        if (i == 7) {
            xf = 8.7;
            yf = temp[i];
        }

        // console.log(carx, cary, xf, yf);
        if (xf <= carx + 0.05 && xf >= carx - 0.05) {
            if (yf <= cary + 0.05 && yf >= cary - 0.05) {
                return "1";
            }
        }
    }

    return "0";
}

var pospointer = 0

function nextfuelcan(carxpass, carzpass) {

    // var printpos = `${pospointer}`;
    // document.getElementById("position").innerHTML = printpos;
    
    var carx = carxpass
    var carz = carzpass

    if (carx >= 5.75 && pospointer == 0) {
        pospointer = 1
    }

    if (carx >= 8.6 && pospointer == 1) {
        pospointer = -1
    }

    if (carz <= -1 && pospointer == -1) {
        pospointer = 2
    }

    if (carx <= 6 && pospointer == 2) {
        pospointer = -2
    }

    if (carx <= -6 && pospointer == -2) {
        pospointer = 3
    }


    if (carz >= -2 && pospointer == 3) {
        pospointer = -3
    }

    if (carz >= -1 && pospointer == -3) {
        pospointer = 4
    }

    if (carx >= -8 && pospointer == 4) {
        pospointer = -4
    }

    if (pospointer == 1) {
        var canxpos = 8.7
        var canypos = temp[7]
        var xDiff = canxpos - carx
        var yDiff = canypos - carz
        var dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
        var printdist = `${dist}`;
        document.getElementById("fueldist").innerHTML = printdist;
        return
    }

    if (pospointer == 2) {
        var canxpos = temp[5]
        var canypos = -5
        var xDiff = canxpos - carx
        var yDiff = canypos - carz
        var dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
        var printdist = `${dist}`;
        document.getElementById("fueldist").innerHTML = printdist;
        return
    }

    if (pospointer == 3) {
        var canxpos = -10.6
        var canypos = temp[6]
        var xDiff = canxpos - carx
        var yDiff = canypos - carz
        var dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
        var printdist = `${dist}`;
        document.getElementById("fueldist").innerHTML = printdist;
        return
    }

    if (pospointer == 4) {
        var canxpos = temp[0]
        var canypos = 4
        var xDiff = canxpos - carx
        var yDiff = canypos - carz
        var dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
        var printdist = `${dist}`;
        document.getElementById("fueldist").innerHTML = printdist;
        return
    }


    // in start straight line
    // ***********************************************************
    if (carx < -3.42 && carx > -8 && carz > 3.72 && carz < 4.26) {
        if (carx <= temp[0]) {
            var dist = Math.abs(temp[0] - carx)
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}` ;
            document.getElementById("fueldist").innerHTML = printdist;
        }
        else {
            var dist = Math.abs(temp[1] - carx);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }

        
    }

    if (carx < 1.16 && carx > -3.42 && carz > 3.72 && carz < 4.26) {

        if (carx <= temp[1]) {
            var dist = Math.abs(temp[1] - carx);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
        else {
            var dist = Math.abs(temp[2] - carx);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
    }

    if (carx < 5.75 && carx > 1.16 && carz > 3.72 && carz < 4.26) {

        if (carx <= temp[2]) {
            var dist = Math.abs(temp[2] - carx);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
        else {

            // distance of the can on first curve
            var canxpos = 8.7
            var canypos = temp[7]
            var xDiff = canxpos - carx
            var yDiff = canypos - carz
            var dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }

    }
    // ***********************************************************

    // in second big straight line
    // ***********************************************************
    if (carx < -2.28 && carx > -6.42 && carz > -5.3 && carz < -4.8) {

        if (carx >= temp[3]) {
            var dist = Math.abs(temp[3] - carx);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
        else {
            // distance of second curve can
            var canxpos = -10.6
            var canypos = temp[6]
            var xDiff = canxpos - carx
            var yDiff = canypos - carz
            var dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }

    }

    if (carx < 1.86 && carx > -2.28 && carz > -5.3 && carz < -4.8) {
        if (carx >= temp[4]) {
            var dist = Math.abs(temp[4] - carx);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
        else {
            var dist = Math.abs(temp[3] - carx);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
    }

    if (carx < 6 && carx > 1.86 && carz > -5.3 && carz < -4.8) {

        if (carx >= temp[5]) {
            var dist = Math.abs(temp[5] - carx);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
        else {
            var dist = Math.abs(temp[4] - carx);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }

    }


    // first curve straight line
    // ***********************************************************
    if (carx < 8.85 && carx > 8.35 && carz > -1 && carz < 2) {

        if (carz >= temp[7]) {
            var dist = Math.abs(temp[7] - carz);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
        else {
            // distance of temp[5]
            var canxpos = temp[5]
            var canypos = -5
            var xDiff = canxpos - carx
            var yDiff = canypos - carz
            var dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
    }
    // ***********************************************************

    // second  curve straight line
    // ***********************************************************
    if (carx < -10.3 && carx > -10.8 && carz > -2 && carz < -1) {

        if (carz <= temp[6]) {
            var dist = Math.abs(temp[6] - carz);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
        else {
            // distance of temp[0]
            var canxpos = temp[0]
            var canypos = 4
            var xDiff = canxpos - carx
            var yDiff = canypos - carz
            var dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
            dist = (Math.round(dist * 10000)/1000).toString().padStart(4, "0");
            var printdist = `${dist}`;
            document.getElementById("fueldist").innerHTML = printdist;
        }
    }
    // ***********************************************************
}


