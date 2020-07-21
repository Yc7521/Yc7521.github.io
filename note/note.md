# 代码

## 1

``` c++
#include <cstdio>

char s[200];
void my_sort() {
    int i, j;
    scanf("%s", s);
    for (i = 0; s[i]; i++)
        for (j = i; s[j]; j++)
            if (s[i] > s[j]) s[i] ^= s[j] ^= s[i] ^= s[j];

    puts(s);
}
```

## 2

``` cpp
void test() {
  int s;
  atomic<int> n;
  vector<int> v(n);
  cin >> s;
  for (int i = 0; i < s; ++i) {
    cin >> v[i];
  }
  for_each(stdext::execution::par, v.begin(), v.end(), [&](auto i) { n += i;
  });
}
```
