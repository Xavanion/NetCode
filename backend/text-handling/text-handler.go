package texthandler

import (
	"github.com/deadpixi/rope"
)

var main_rope rope.Rope

func Initialize() {
	main_rope = rope.New()
}

func Insert_text(position int, text string) {
	main_rope.InsertString(position, text)
}

func Append_text(text string) {
	main_rope.AppendString(text)
}

func Length() int {
	return main_rope.Length()
}

func Test() int {
	return 0
}
