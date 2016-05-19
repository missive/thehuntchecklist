require_relative 'lib/assets'

task :precompile do
  %w[
    assets/javascripts/base.js
    assets/javascripts/application.js
    assets/stylesheets/application.css
  ].each do |path|
    tmp = File.read(path)
    File.unlink(path)
    puts "Compiling #{path}..."
    begin
      File.write(path, ASSETS[path])
    rescue
      File.write(path, tmp)
    end
  end
end
