module('Lesson 3 - Time');

/*
 * Step 1: find the 1st method that fails
 * Step 2: Fill in the blank ____ to make it pass
 * Step 3: run it again
 * Note: Do not change anything other than the blank
 */

asyncTest('LaunchingAnActionInTheFuture', function() {
    var received = '';

    //this delay can be more than the setTimeout of 500ms
    //because the setTimeout will wait for *at least* 500ms, or as
    //long as the code takes to execute, before it runs
    var delay = 1000;
    Rx
        .Scheduler
        .immediate
        .schedule(function() { received = 'Finished'; }, delay);

    setTimeout(function() { equals(received, 'Finished'); start(); }, 500);
});

asyncTest('LaunchingAnEventInTheFuture', function() {
    var received = '',

        //this time must be less than the setTimeout of 500ms
        //because as soon as subscribe is called, and 500ms has
        //passed, setTimeout will execute
        time = 400;

    Rx
        .Observable
        .returnValue('Godot', Rx.Scheduler.Immediate)
        .delay(time)
        .subscribe(function(x) { received = x; });

    setTimeout(function() { equals(received, 'Godot'); start(); }, 500);
});

asyncTest('AWatchedPot', function() {
    var received = '',
        delay = 500,

        //this timeout must be greater than the setTimeout's 500ms
        //delay or the string will be Tepid, not Boiling
        timeout = 600,
        timeoutEvent =
            Rx  .Observable
                .returnValue('Tepid');
    Rx
        .Observable
        .returnValue('Boiling')
        .delay(delay)
        .timeout(timeout, timeoutEvent)
        .subscribe(function(x) { received = x; });

    setTimeout(function() { equals(received, 'Boiling'); start(); }, 500);
});

