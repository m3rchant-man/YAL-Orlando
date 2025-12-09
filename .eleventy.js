module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Watch CSS files for changes
  eleventyConfig.addWatchTarget("./src/css/");
  
  // Add date filter
  eleventyConfig.addFilter("dateFormat", function(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Add global data for pathPrefix (normalize for absolute URLs)
  const normalizePathPrefix = (prefix) => {
    if (!prefix) return "/";
    let normalized = prefix;
    if (!normalized.startsWith("/")) normalized = `/${normalized}`;
    if (!normalized.endsWith("/")) normalized = `${normalized}/`;
    return normalized;
  };

  const pathPrefix = normalizePathPrefix(process.env.PATH_PREFIX);
  eleventyConfig.addGlobalData("pathPrefix", pathPrefix);

  return {
    pathPrefix,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};

