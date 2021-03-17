#include <stdio.h>

static char code[65536];
static unsigned char data[65536];

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

  int c;
  for(unsigned short i = 0, p = 0; i < length; i++) {
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
      case ',': c = getchar(); data[p] = (c != EOF)? c: '\0'; break;
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
    }
  }

  return 0;
}
