// import { Observable } from 'rxjs';

// const observable = new Observable((subscriber) => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   setTimeout(() => {
//     subscriber.next(4);
//     subscriber.complete();
//   }, 1000);
// });

// console.log('just before subscribe');
// observable.subscribe({
//   next(x) {
//     console.log('got value ' + x);
//   },
//   error(err) {
//     console.error('something wrong occurred: ' + err);
//   },
//   complete() {
//     console.log('done');
//   },
// });
// console.log('just after subscribe');

// import { interval } from 'rxjs';

// const observable = interval(1000 /* number of milliseconds */);

// import { of, map } from 'rxjs';

// of(1, 2, 3).pipe(map(x => x * x), ).subscribe(v => console.log(v))

// of(1, 2, 3).pipe(first()).subscribe(v => console.log(v))


import { of, tap, map } from 'rxjs';

of(Math.random()).pipe(
  tap(console.log),
  map(n => n > 0.5 ? 'big' : 'small')
).subscribe(console.log);





