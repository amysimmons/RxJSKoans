module('Lesson 1 - Observable Streams');

/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 */

var Range = {
	create : function (start, count) {
		var values = [];
		for(var i = 0; i < count; i++) {
			values.push(i + start);
		}
		
		return values;
	}
}; 

Array.prototype.toObservable = function() {
	return Rx.Observable.FromArray(this);
};
 
test('SimpleSubscription', function() {
    Rx.Observable.Return(42).Subscribe(function(x) { equals(x, 42); });	
});

test('SimpleReturn', function() {
    var received = '';
    Rx.Observable.Return('Foo').Subscribe(function(x) { received = x; });
    equals('Foo', received);
});

test('TheLastEvent', function() {
    var received = '';
    var numbers = ['Foo','Bar'];
    Rx.Observable.FromArray(numbers).Subscribe(function(x) { received = x; });
    equals('Bar', received);
});

test('EveryThingCounts', function() {
	var received = 0;
	var numbers = [3, 4 ];
	Rx.Observable.FromArray(numbers).Subscribe(function(x) { received += x; });
	equals(7, received);	
});

test('DoingInTheMiddle', function() {
	var status = [];
	var daysTillTest = Range.create(1, 4).reverse().toObservable();
	daysTillTest.Do(function(d) { status.push(d + '=' + (d === 1 ? 'Study Like Mad' : 'Party')); }).Subscribe();
	equals('4=Party,3=Party,2=Party,1=Study Like Mad', status.toString());
});

test('NothingListensUntilYouSubscribe', function() {
	var sum = 0;
	var numbers = Range.create(1,10).toObservable();
	var observable = numbers.Do(function(n) { sum += n; });
	equals(0, sum);
	observable.Subscribe();
	equals(10*11/2,sum);	
});