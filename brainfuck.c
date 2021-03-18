#include <stdio.h>

static char code[65536];
static unsigned char data[65536];

inline unsigned char read() {
  int c = getchar();
  return (c == EOF)? '\0': c;
}

int main(int argc, char *argv[]){
  if(argc < 2) {
    fprintf(stderr, "Usage: %s program.b\n", argv[0]);
    return 1;
  }

  FILE *file = fopen(argv[1], "r");
  if(file == NULL) {
    perror("Unable to open program");
    return 1;
  }

  size_t length = fread(code, 1, sizeof(code), file);
  fclose(file);

  for(int i = 0, p = 0; i < length; i++) {
    switch(code[i]) {
      case '<':
        if(p == 0) {
          fprintf(stderr, "Went left beyond end of tape\n");
          return 1;
        }
        p--;
        break;
      case '>':
        if(p == sizeof(data) - 1) {
          fprintf(stderr, "Went right beyond end of tape\n");
          return 1;
        }
        p++;
        break;
      case '+': data[p]++; break;
      case '-': data[p]--; break;
      case ',': data[p] = read(); break;
      case '.': putchar(data[p]); break;
      case '[':
        if(!data[p]) {
          for(int l = 1; l; i++, l -= (code[i] == ']') - (code[i] == '[')) {
            if(i == length - 1) {
              fprintf(stderr, "Unmatched left brace\n");
              return 1;
            }
          }
        }
        break;
      case ']':
        if(data[p]) {
          for(int l = 1; l; i--, l += (code[i] == ']') - (code[i] == '[')) {
            if(i == 0) {
              fprintf(stderr, "Unmatched right brace\n");
              return 1;
            }
          }
        }
        break;
      case '#':
        for(int i = 0; i < sizeof(data); i += 16) {
          if(
            data[i +  0] || data[i +  1] || data[i +  2] || data[i +  3] ||
            data[i +  4] || data[i +  5] || data[i +  6] || data[i +  7] ||
            data[i +  8] || data[i +  9] || data[i + 10] || data[i + 11] ||
            data[i + 12] || data[i + 13] || data[i + 14] || data[i + 15] ||
            (p >= i && p < i + 16)
          ) {
            fprintf(
              stderr,
              "%04x   %c%3u%c%3u%c%3u%c%3u%c%3u%c%3u%c%3u%c%3u%c  %c%3u%c%3u%c%3u%c%3u%c%3u%c%3u%c%3u%c%3u%c\n\n",
              i,
              (i +  0 == p)? '(': ' ', data[i +  0],
              (i +  0 == p)? ')': ((i +  1 == p)? '(': ' '), data[i +  1],
              (i +  1 == p)? ')': ((i +  2 == p)? '(': ' '), data[i +  2],
              (i +  2 == p)? ')': ((i +  3 == p)? '(': ' '), data[i +  3],
              (i +  3 == p)? ')': ((i +  4 == p)? '(': ' '), data[i +  4],
              (i +  4 == p)? ')': ((i +  5 == p)? '(': ' '), data[i +  5],
              (i +  5 == p)? ')': ((i +  6 == p)? '(': ' '), data[i +  6],
              (i +  6 == p)? ')': ((i +  7 == p)? '(': ' '), data[i +  7],
              (i +  7 == p)? ')': ' ',
              (i +  8 == p)? '(': ' ', data[i +  8],
              (i +  8 == p)? ')': ((i +  9 == p)? '(': ' '), data[i +  9],
              (i +  9 == p)? ')': ((i + 10 == p)? '(': ' '), data[i + 10],
              (i + 10 == p)? ')': ((i + 11 == p)? '(': ' '), data[i + 11],
              (i + 11 == p)? ')': ((i + 12 == p)? '(': ' '), data[i + 12],
              (i + 12 == p)? ')': ((i + 13 == p)? '(': ' '), data[i + 13],
              (i + 13 == p)? ')': ((i + 14 == p)? '(': ' '), data[i + 14],
              (i + 14 == p)? ')': ((i + 15 == p)? '(': ' '), data[i + 15],
              (i + 15 == p)? ')': ' '
            );
          }
        }
        break;
    }
  }

  return 0;
}
