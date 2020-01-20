/** @jsx jsx */
import { jsx } from "theme-ui"
import { Heading } from "@theme-ui/components"

const NewPost = () => {
  return (
    <section
      sx={{
        padding: 4,
        backgroundColor: "sectionBackground",
        fonts: "body",
      }}
    >
      <Heading as="h1">New story</Heading>
      <form>
        <div className="form-group">
          <label htmlFor="title">title</label>
          <input type="text" name="title" id="title" />
        </div>

        <div className="form-group">
          <label htmlFor="story">Story</label>
          <textarea id="story" name="story"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" id="date" />
        </div>

        <div className="form-group">
          <span>Category</span>

          <div className="categories-container">
            <label>
              a
              <input type="checkbox" name="category" value="d" />
            </label>
            <label>
              a
              <input type="checkbox" name="category" value="vd" />
            </label>
            <label>
              a
              <input type="checkbox" name="category" value="ld" />
            </label>

            <label>
              a
              <input type="checkbox" name="category" value="sp" />
            </label>

            <label>
              a
              <input type="checkbox" name="category" value="obe" />
            </label>

            <label>
              Aa
              <input type="checkbox" name="category" value="ap" />
            </label>

            <label>
              aa
              <input type="checkbox" name="category" value="m" />
            </label>

            <label>
              Other
              <input type="checkbox" name="category" value="o" />
            </label>
          </div>
        </div>

        <div className="form-group">
          <span>Img</span>
          <div className="uploads-container">
            <div className="image-upload outer">
              <div className="image-upload inner"></div>
            </div>
            <div className="image-upload outer">
              <div className="image-upload inner"></div>
            </div>
            <div className="image-upload outer">
              <div className="image-upload inner"></div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="puplic">Private / public</label>
          <span>Do you want to share your experience?</span>
          <input type="checkbox" name="public" value="bool" id="puplic" />
        </div>

        <button>save</button>
      </form>
    </section>
  )
}

export default NewPost
