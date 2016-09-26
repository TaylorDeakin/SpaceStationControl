function ok(expr, msg) {
    if (!expr) throw new Error(msg);
}

suite('Fleet');

test('Purchase Small Ship', function () {
    resources.metal.amount = 500;
    fleet.methods.purchase(1);

    ok(buildings.shipyard.docks.small.current == 1, "There should be one ship after purchasing");
    ok(resources.metal.amount == 0, "500 metal should have been deducted");
});

test('Purchase Medium Ship', function () {
    resources.metal.amount = 1500;
    fleet.methods.purchase(2);

    ok(buildings.shipyard.docks.medium.current == 1, "There should be one medium ship after purchasing");
    ok(resources.metal.amount == 0, "1500 metal should have been deducted");
});

test('Purchase Large Ship', function () {
    resources.metal.amount = 5000;
    fleet.methods.purchase(3);

    ok(buildings.shipyard.docks.large.current == 1, "There should be one medium ship after purchasing");
    ok(resources.metal.amount == 0, "5000 metal should have been deducted");
});


suite('Resource Storage');

test('Hydrogen Storage', function () {
    ok(resources.hydrogen.maxStorage == 2000, "Initial storage should be 2000");
    resources.metal.amount = 100;
    buildings.storage.metal.purchase();

    ok(resources.hydrogen.maxStorage == 2500, "Buying a hydrogen tank should increase the amount of storage by 500");
    ok(resources.metal.amount == 0, "Buying a hydrogen tank should cost 100 metal");

});