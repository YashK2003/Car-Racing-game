function carcollide(myx, myz, x1, z1, x2, z2, x3, z3, myangle, fanfle, maclarenangle, dogdeangle) {

    // console.log(myx, myz);

    // determine the cars four coordinate
    var diffx = Math.abs(myx - x1)
    var diffz = Math.abs(myz - z1)

    if (diffx < 0.12 && diffz < 0.2) {
        return 1;
    }

    diffx = Math.abs(myx - x2)
    diffz = Math.abs(myz - z2)

    if (diffx < 0.12 && diffz < 0.2) {
        return 1;
    }

    diffx = Math.abs(myx - x3)
    diffz = Math.abs(myz - z3)

    if (diffx < 0.12 && diffz < 0.2) {
        return 1;
    }

    return 0;

}

var barrierpointer = 0

function outoftrack(myx, myz, pointer) {

    if (barrierpointer == 0) {
        if (myx > 1.62 && myx <= 5.75) {
            if (myz < 3.72 || myz > 4.26) {
                return 1;
            }
        }
    }
    if(barrierpointer == 0 && myx >= 5.75){
        
    }

    if (myx > -6 && myx <= 6.42) {
        if (myz > -4.8 || myz < -5.3) {
            return 1;
        }
    }

    if (myz > -2 && myz <= -1) {
        if (myx > -10.3 || myx < -10.8) {
            return 1;
        }
    }

    if (myz > -1 && myz <= 2) {
        if (myx > 8.35 || myx < 8.85) {
            return 1;
        }
    }

    return 0
}