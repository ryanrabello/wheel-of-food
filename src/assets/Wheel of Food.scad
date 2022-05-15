pointCount = 14;
radius = 20;

bottomPoints = [
    for(i = [0 : pointCount - 1]) [
        radius * sin((i / pointCount) * 360),
        radius * cos((i / pointCount) * 360),
        0
    ]
];
middlePoints = [
    for(i = [0 : 2 : pointCount - 1]) [
        radius * sin((i / pointCount) * 360),
        radius * cos((i / pointCount) * 360),
        5
    ]
];
topPoints = [
    for(i = [0 : 2 : pointCount - 1]) [
        radius * sin((i / pointCount) * 360 + 180),
        radius * cos((i / pointCount) * 360 + 180),
        7.5
    ]
];
topMiddle = [0, 0, 7.5];
bottomMiddle = [0, 0, 0];
echo(middlePoints);

allPoints = concat(bottomPoints, middlePoints, topPoints, [topMiddle, bottomMiddle]);
echo(allPoints);
    
//for (i = [0 : len(allPoints) - 1]) {
//    p = allPoints[i];
//    translate([p[0], p[1], p[2]]) {
//        sphere(.5, $fn=100);
//        translate([0, 0, 1]) rotate([90, 0, 0]) {
//            text(str(i), 1);
//        }
//    }
//}

polyhedron(points=allPoints, faces=[
    [for (i = [0 : 13]) 13 - i],

    // Wall peices
    [15, 25, 1, 2],
    [25, 14, 0, 1],
    [0, 14, 24, 13],
    [13, 24, 20, 12],
    [11, 12, 20, 23],
    [10, 11, 23, 19],
    [9, 10, 19, 22],
    [8,9, 22, 18],
    [7,8,18, 21],
    [6,7,21,17],
    [5,6,17,27],
    [4,5,27, 16],
    [3, 4, 16, 26],
    [2, 3, 26, 15],
    

    // top faces
    [15, 28, 25],
    [25, 28, 14],
    [15, 26, 28],
    [26, 16, 28],
    [16, 27, 28],
    [27, 17, 28],
    [17, 21, 28],
    [21, 18, 28],
    [18, 22, 28],
    [22, 19, 28],
    [19, 23, 28],
    [23, 20, 28],
    [20, 24, 28],
    [24, 14, 28]
    
    
    
]);
echo([0 : 13]);