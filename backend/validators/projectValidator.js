const { z } = require('zod');

const projectSchema = z.object({
  title: z.string().min(1, "Tittel er påkrevd"),
  content: z.string().min(1, "Innhold er påkrevd"),
  description: z.string().min(1, "Beskrivelse er påkrevd"),
  publishedAt: z.date().optional(),
  status: z.string().min(1, "Status er påkrevd"),
  public: z.boolean(),
  link: z.string().url("Ugyldig URL").optional(),
});

const validateProject = (data) => {
  projectSchema.parse(data);
};

module.exports = { validateProject };
