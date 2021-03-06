// The size of the tile (one pixel will get added between each as padding)
const TILE_SIZE = 8;

// The screen width (not scaled) in pixels
const SCREEN_WIDTH = 480;
const SCREEN_HEIGHT = 300;
// How many times the width and height will be scaled onto the screen
// Example:
// SCREEN_WIDTH = 200;
// SCREEN_HEIGHT = 100;
// so the rendered screen, will be 400x200
const SCREEN_SCALE = 2;

// All the characters of the sheet!
// You will notice, that there are some numbers missing. That is because, I removed all the duplicates (without removing them from the image)
const AT = 0;
const A = 1;
const B = 2;
const C = 3;
const D = 4;
const E = 5;
const F = 6;
const G = 7;
const H = 8;
const I = 9;
const J = 10;
const K = 11;
const L = 12;
const M = 13;
const N = 14;
const O = 15;
const P = 16;
const Q = 17;
const R = 18;
const S = 19;
const T = 20;
const U = 21;
const V = 22;
const W = 23;
const X = 24;
const Y = 25;
const Z = 26;
const LEFT_SQUARE_BRACKET = 27;
const POUND = 28;
const RIGHT_SQUARE_BRACKET = 29;
const UP_ARROW = 30;
const LEFT_ARROW = 31;
const SPACE = 32;
const EXCLAMATION = 33;
const QUOTE = 34;
const HASH = 35;
const DOLLAR = 36;
const MODULUS = 37;
const AMPERSAND = 38;
const APOSTROPHE = 39;
const LEFT_PAREN = 40;
const RIGHT_PAREN = 41;
const ASTERISK = 42;
const PLUS = 43;
const COMMA = 44;
const HYPHON = 45;
const PERIOD = 46;
const FWD_SLASH = 47;
const ZERO = 48;
const ONE = 49;
const TWO = 50;
const THREE = 51;
const FOUR = 52;
const FIVE = 53;
const SIX = 54;
const SEVEN = 55;
const EIGHT = 56;
const NINE = 57;
const COLON = 58;
const SEMICOLON = 59;
const LESS_THAN = 60;
const EQUAL = 61;
const GREATER_THAN = 62;
const QUESTION = 63;
const HORIZONTAL_LINE = 64;
const SPADE = 65;
const VERTICAL_LINE = 66;
// Duplicate of HORIZONTAL_LINE
const TOP_HORIZONTAL_LINE_1 = 68;
const TOP_HORIZONTAL_LINE_2 = 69;
const BOTTOM_HORIZONTAL_LINE_1 = 70;
const LEFT_VERTICAL_LINE_1 = 71;
const RIGHT_VERTICAL_LINE_1 = 72;
const BOTTOM_LEFT_CURVE = 73;
const TOP_RIGHT_CURVE = 74;
const TOP_LEFT_CURVE = 75;
const BOTTOM_LEFT_ANGLE = 76;
const BACK_DIAGONAL_LINE = 77;
const FORWARD_DIAGONAL_LINE = 78;
const TOP_LEFT_ANGLE = 79;
const TOP_RIGHT_ANGLE = 80;
const CIRCLE = 81;
const LOWER_VERTICAL_LINE_2 = 82;
const HEART = 83;
const LEFT_VERTICAL_LINE_2 = 84;
const BOTTOM_RIGHT_CURVE = 85;
const BIG_X = 86;
const BIG_O = 87;
const CLUB = 88;
const RIGHT_VERTICAL_LINE_2 = 89;
const DIAMOND = 90;
const BIG_PLUS = 91;
const LEFT_SIDE_CHECKER = 92;
// Duplicate of VERTICAL_LINE
const PI = 94;
const TOP_RIGHT_SLANT = 95;
// Duplicate of SPACE
const LEFT_HALF = 97;
const BOTTOM_HALF = 98;
const TOP_PIXEL = 99;
const BOTTOM_PIXEL = 100;
const LEFT_VERTICAL_LINE_3 = 101;
const CHECKER = 102;
const RIGHT_VERTICAL_LINE_3 = 103;
const BOTTOM_HALF_CHECKER = 104;
const TOP_LEFT_SLANT = 105;
// Duplicate of RIGHT_VERTICAL_LINE_3
const TOP_RIGHT_BOTTOM_PIPE = 107;
const BOTTOM_RIGHT_QUARTER = 108;
const TOP_RIGHT_PIPE = 109;
const BOTTOM_LEFT_PIPE = 110;
const BOTTOM_HORIZONTAL_LINE_3 = 111;
const BOTTOM_RIGHT_PIPE = 112;
const LEFT_TOP_RIGHT_PIPE = 113;
const LEFT_BOTTOM_RIGHT_PIPE = 114;
const LEFT_TOP_BOTTOM_PIPE = 115;
// Duplicate of LEFT_VERTICAL_LINE_3
const LEFT_THIRD = 117;
const RIGHT_THIRD = 118;
const TOP_HORIZONTAL_LINE_3 = 119;
const TOP_THIRD = 120;
const BOTTOM_THIRD = 121;
const BOTTOM_RIGHT_ANGLE = 122;
const BOTTOM_LEFT_QUARTER = 123;
const TOP_RIGHT_QUARTER = 124;
const TOP_LEFT_PIPE = 125;
const TOP_LEFT_QUARTER = 126;
const THICK_CHECKER = 127;
// They would have saved alot of memory if they hadn't duplicated so many tiles XD

// All the colors that the Commodore 64's PETSCII could render!
const BLACK = "#000000";
const WHITE = "#ffffff";
const DARK_BROWN = "#883932";
const LIGHT_BLUE = "#67b6bd";
const PINK = "#8b3f96";
const MID_DARK_GREEN = "#55a049";
const DARK_BLUE = "#40318d";
const LIGHT_GREEN = "#bfce72";
const MID_BROWN = "#8b5429";
const DARK_GREEN = "#574200";
const LIGHT_BROWN = "#b86962";
const DARK_GRAY = "#505050";
const MID_GRAY = "#787878";
const MID_LIGHT_GREEN = "#94e089";
const MID_BLUE = "#7869c4";
const LIGHT_GRAY = "#9f9f9f";

// The color order on the texture sheet
const COLORS = [BLACK, WHITE, DARK_BROWN, LIGHT_BLUE, PINK, MID_DARK_GREEN, DARK_BLUE, LIGHT_GREEN, MID_BROWN, DARK_GREEN, LIGHT_BROWN, DARK_GRAY, MID_GRAY, MID_LIGHT_GREEN, MID_BLUE, LIGHT_GRAY];

const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];