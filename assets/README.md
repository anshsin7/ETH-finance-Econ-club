# Photos

Drop the founders' photos here, then update `index.html`:

1. Add your images to this folder, e.g. `ansh.jpg` and `siran.jpg` (portrait / 4:5 works best).
2. In `index.html`, inside each `.member__photo`, replace the `<span class="member__initials">…</span>`
   with an image tag:

   ```html
   <img src="assets/ansh.jpg" alt="Ansh Saini" />
   ```

The "Photo coming soon" overlay and the initials disappear automatically once an `<img>` is present.
